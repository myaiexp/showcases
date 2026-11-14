// Custom layer: its order, depthTest and which lights reach it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 9, pitch: -18, autoRotate: 14 });
  const { app } = rig;
  const layers = app.scene.layers;
  const world = layers.getLayerByName('World')!;

  // A layer of our own. A new layer joins the composition with push() (both sub-layers, at the end).
  const overlay = new pc.Layer({ name: 'Overlay' });
  layers.push(overlay);
  // Cameras render, and lights light, only the layers in their `layers` lists.
  const cam = rig.camera.camera!;
  cam.layers = [...cam.layers, overlay.id];
  const sun = rig.sunLight!.light!;

  // Ordinary content on World: a crate and a ball standing in front of the marker.
  addMesh(app, 'plane', pbrMaterial('#6d7a8c', { gloss: 0.2 }), [0, -1, 0], 14);
  addMesh(app, 'box', pbrMaterial('#c8a165'), [-0.8, 0, 1.2], 1.8);
  addMesh(app, 'sphere', pbrMaterial('#4ab3e8', { gloss: 0.9 }), [1.4, 0, 0.8], 1.8);

  // The marker lives on the Overlay layer and sits partly behind the crate and ball.
  const markerMaterial = pbrMaterial('#ff4d6d', { emissive: new pc.Color(1, 0.2, 0.3), emissiveIntensity: 0.6 });
  const marker = addMesh(app, 'torus', markerMaterial, [0, 0.4, -1.2], 5);
  marker.render!.layers = [overlay.id];
  app.on('update', (dt: number) => marker.rotate(0, 0, 30 * dt));

  const place = (where: 'last' | 'first'): void => {
    layers.remove(overlay);
    if (where === 'last') layers.push(overlay);
    else layers.insert(overlay, 0);
  };
  // depthTest decides whether nearer geometry hides the marker, whatever the layer order.
  const setDepthTest = (on: boolean): void => {
    markerMaterial.depthTest = on;
    markerMaterial.update();
  };

  if (ctx.preview) {
    // Cards flip through the combinations on a timer.
    let t = 0;
    app.on('update', (dt: number) => {
      const before = Math.floor(t / 2);
      t += dt;
      const step = Math.floor(t / 2);
      if (step === before) return;
      const state = step % 3;
      place(state === 1 ? 'first' : 'last');
      setDepthTest(state !== 2);
    });
  } else {
    const panel = createPanel(el);
    panel.select('Overlay position', ['last (after World)', 'first (before World)'], 'last (after World)', (v) => place(v.startsWith('last') ? 'last' : 'first'));
    panel.check('marker depthTest', true, setDepthTest);
    panel.check('Overlay layer enabled', true, (on) => (overlay.enabled = on));
    panel.check('sun lights Overlay too', true, (on) => (sun.layers = on ? [world.id, overlay.id] : [world.id]));
    panel.readout('depthTest on: order does not matter, depth decides. Off: later layers paint over earlier ones.');
  }
  sun.layers = [world.id, overlay.id];
  return () => rig.dispose();
};

export default mount;

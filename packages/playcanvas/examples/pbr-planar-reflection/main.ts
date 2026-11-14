// Planar reflection: a mirrored camera renders into the floor
import * as pc from 'playcanvas';
import { PlanarRenderer } from 'playcanvas/scripts/esm/planar-renderer.mjs';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 9, pitch: -14, target: new pc.Vec3(0, 0.8, 0), autoRotate: 10 });
  const { app } = rig;
  const layers = app.scene.layers;
  const world = layers.getLayerByName('World')!;
  const skybox = layers.getLayerByName('Skybox')!;

  // The floor sits on its own layer: the reflection camera does not render it, so the floor
  // never appears in its own reflection.
  const floorLayer = new pc.Layer({ name: 'Floor' });
  layers.push(floorLayer);
  rig.camera.camera!.layers = [...rig.camera.camera!.layers, floorLayer.id];

  const reflection = new pc.Entity('reflection-camera');
  reflection.addComponent('camera', { layers: [world.id, skybox.id], priority: -1, toneMapping: pc.TONEMAP_NEUTRAL });
  reflection.addComponent('script');
  const planar = reflection.script!.create(PlanarRenderer, {
    properties: { sceneCameraEntity: rig.camera, planePoint: new pc.Vec3(0, 0, 0), planeNormal: new pc.Vec3(0, 1, 0), mipmaps: true, hdr: true },
  }) as PlanarRenderer;
  app.root.addChild(reflection);

  const floor = pbrMaterial('#1a1d24', { gloss: 0.9, reflectivity: 1 });
  addMesh(app, 'plane', floor, [0, 0, 0], [14, 1, 14]).render!.layers = [floorLayer.id];

  const shapes = [
    addMesh(app, 'sphere', pbrMaterial('#e8794a', { gloss: 0.8 }), [-2, 1, 0], 2),
    addMesh(app, 'box', pbrMaterial('#4ab3e8', { gloss: 0.8 }), [0.4, 0.8, 1.2], 1.6),
    addMesh(app, 'cone', pbrMaterial('#7bc67b', { gloss: 0.8 }), [2.2, 1, -0.6], [1.6, 2, 1.6]),
  ];

  let t = 0;
  let on = true;
  app.on('update', (dt: number) => {
    t += dt;
    shapes.forEach((s, i) => s.setLocalPosition(s.getLocalPosition().x, 1.1 + Math.sin(t * 1.2 + i * 2) * 0.35, s.getLocalPosition().z));
    // After the main camera has moved for the frame: refresh the texture and hand it to the floor.
    const texture = planar.frameUpdate();
    floor.planarReflectionMap = on ? texture : null;
    floor.planarReflectionMatrix = planar.viewProjectionMatrix;
    floor.update();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('floor gloss (blurs via mipmaps)', 0.4, 1, 0.01, 0.9, (v) => (floor.gloss = v));
    panel.check('planar reflection (else the sky only)', true, (v) => (on = v));
    panel.check('hdr', true, (v) => (planar.hdr = v));
    panel.slider('scale', 0.1, 1, 0.05, 0.5, (v) => (planar.scale = v));
  }
  return () => rig.dispose();
};

export default mount;

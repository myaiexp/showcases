// A camera renders only the layers in its layers list, so two views differ
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addCanvasLabels, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30);

  const world = app.scene.layers.getLayerByName('World')!;
  // Two extra layers. A new layer joins the composition with push().
  const ghosts = new pc.Layer({ name: 'Ghosts' });
  const markers = new pc.Layer({ name: 'Markers' });
  app.scene.layers.push(ghosts);
  app.scene.layers.push(markers);

  addGround(app, '#3a4152', 30);
  const crate = addShape(app, 'box', '#c8a165', [0, 0.75, 0], 1.5);
  // Entities choose their layers through the render component.
  const ghost = addShape(app, 'sphere', '#9ae6ff', [-2.6, 1, 0], 1.6, { layers: [ghosts.id] });
  const marker = addShape(app, 'cone', '#ff4d6d', [2.6, 1, 0], [1, 2, 1], { layers: [markers.id] });

  // The left view sees World + Ghosts, the right view World + Markers.
  const make = (name: string, rect: pc.Vec4, layers: number[], priority: number): pc.CameraComponent => {
    const entity = addCamera(app, { rect, layers, priority, fov: 50 }, name);
    entity.setPosition(0, 3, 8);
    entity.lookAt(0, 1, 0);
    return entity.camera!;
  };
  const left = make('left', new pc.Vec4(0, 0, 0.5, 1), [world.id, ghosts.id], 0);
  const right = make('right', new pc.Vec4(0.5, 0, 0.5, 1), [world.id, markers.id], 1);
  addCanvasLabels(stage.canvas, [
    { text: 'layers: World, Ghosts', rect: [0, 0, 0.5, 1] },
    { text: 'layers: World, Markers', rect: [0.5, 0, 0.5, 1] },
  ]);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    crate.rotate(0, 25 * dt, 0);
    ghost.setLocalPosition(-2.6, 1.2 + Math.sin(t * 2) * 0.4, Math.sin(t) * 1.2);
    marker.rotate(0, -60 * dt, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const toggle = (cam: pc.CameraComponent, layer: pc.Layer) => (on: boolean) => {
      cam.layers = on ? [...cam.layers, layer.id] : cam.layers.filter((id) => id !== layer.id);
    };
    panel.check('left sees Markers', false, toggle(left, markers));
    panel.check('right sees Ghosts', false, toggle(right, ghosts));
  }

  return () => stage.dispose();
};

export default mount;

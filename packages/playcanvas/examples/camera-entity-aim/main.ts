// A camera is an entity: setPosition moves it and lookAt aims its -Z axis at a target
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addGround, addSceneryRing, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.32);

  addSun(app, 50, 30);
  addGround(app);
  addSceneryRing(app, 8, 4);
  const target = addShape(app, 'cone', '#ffffff', [0, 1, 0], [1, 2, 1]);

  // new Entity + addComponent('camera') + addChild: the whole recipe.
  const camera = new pc.Entity('Camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.3, 0.3, 0.7) });
  app.root.addChild(camera);

  const state = { radius: 9, height: 5, lookY: 1, speed: 0.4 };
  let angle = 0;
  app.on('update', (dt: number) => {
    angle += dt * state.speed;
    // Aim the camera by transforming its entity.
    camera.setPosition(Math.sin(angle) * state.radius, state.height, Math.cos(angle) * state.radius);
    camera.lookAt(0, state.lookY, 0);
    target.rotate(0, 40 * dt, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('orbit radius', 3, 16, 0.5, state.radius, (v) => (state.radius = v));
    panel.slider('height', 0.5, 12, 0.5, state.height, (v) => (state.height = v));
    panel.slider('lookAt y', -2, 4, 0.1, state.lookY, (v) => (state.lookY = v));
    panel.slider('speed', 0, 1.5, 0.05, state.speed, (v) => (state.speed = v));
  }

  return () => stage.dispose();
};

export default mount;

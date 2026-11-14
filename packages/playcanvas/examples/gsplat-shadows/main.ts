// A splat that casts shadows onto an ordinary mesh, tuned with alphaClip
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, knotCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 9, pitch: -32, yaw: 20, autoRotate: 6 });
  const { app } = scene;

  // The splat: castShadows on the gsplat component is all it takes.
  const knot = scene.add(cloudContainer(scene.stage.device, knotCloud(14000, 7, 0.06)), 'knot', { castShadows: true });
  knot.setPosition(0, 1.6, 0);

  // Splats cannot receive shadows, so the receiver is a plain mesh.
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0.75, 0.78, 0.85);
  material.update();
  const ground = new pc.Entity('ground');
  ground.addComponent('render', { type: 'plane', material });
  ground.setLocalScale(9, 1, 9);
  app.root.addChild(ground);

  // The light has to cast shadows too.
  const sun = new pc.Entity('sun');
  sun.addComponent('light', {
    type: 'directional',
    castShadows: true,
    shadowDistance: 20,
    shadowResolution: 2048,
    shadowBias: 0.2,
    normalOffsetBias: 0.05,
    intensity: 1.2,
  });
  app.root.addChild(sun);
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.32);

  let time = 0;
  let swing = true;
  app.on('update', (dt: number) => {
    time += dt;
    if (swing) sun.setEulerAngles(48, 30 + Math.sin(time * 0.6) * 55, 0);
    knot.rotate(0, 20 * dt, 0);
  });
  sun.setEulerAngles(48, 30, 0);

  app.scene.gsplat.alphaClip = 0.4;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('gsplat.alphaClip', 0.02, 0.9, 0.02, 0.4, (v) => (app.scene.gsplat.alphaClip = v));
    panel.check('knot.gsplat.castShadows', true, (on) => (knot.gsplat!.castShadows = on));
    panel.check('Swing the light', true, (on) => (swing = on));
    panel.readout('lower alphaClip: more translucent splats join the shadow');
  }

  return () => scene.dispose();
};

export default mount;

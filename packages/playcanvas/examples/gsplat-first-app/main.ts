// The engine guide's first splat app: no MSAA, camera controls, a gsplat
import * as pc from 'playcanvas';
// The script ships as plain JavaScript without type definitions.
// @ts-expect-error untyped module
import { CameraControls } from 'playcanvas/scripts/esm/camera-controls.mjs';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, knotCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  // 1. The application, with MSAA off: splat rendering is bound by fragment work. (createSplatScene
  //    passes antialias: false to the graphics device, as the guide does.)
  const scene = await createSplatScene(el, ctx, { distance: 3, pitch: -10 });
  const { app, camera } = scene;
  scene.orbit.dispose(); // the guide uses the engine's camera controls instead
  camera.setPosition(0, 0, 3.4);
  camera.lookAt(0, 0, 0);

  // 2. Camera controls: a script on the camera entity (orbit, pan, zoom).
  camera.addComponent('script');
  camera.script!.create(CameraControls, { properties: { focusPoint: new pc.Vec3(0, 0, 0) } });

  // 3. The splat entity: a gsplat component on an entity under the root. The guide's captured
  //    splat is upside down and turned 180 degrees about Z; this knot is built upright, so
  //    the panel lets you see what that rotation does.
  const container = cloudContainer(scene.stage.device, knotCloud(14000, 7, 0.035));
  const splat = scene.add(container, 'Knot');
  splat.setLocalScale(0.5, 0.5, 0.5);
  splat.setPosition(0, -0.1, 0);

  if (ctx.preview) {
    // No input in a card: the knot turns by itself.
    app.on('update', (dt: number) => splat.rotate(0, 25 * dt, 0));
  } else {
    const panel = createPanel(el);
    panel.check('setEulerAngles(0, 0, 180)', false, (on) => splat.setEulerAngles(0, 0, on ? 180 : 0));
    panel.readout('left drag orbits, middle drag pans, wheel zooms');
    scene.stage.canvas.focus();
  }

  return () => scene.dispose();
};

export default mount;

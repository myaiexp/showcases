// The camera's read-only frustum answers containsPoint, as culling does
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addShape, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.4, 0.42, 0.48);
  addSun(app, 70, 20);

  const inside = colorMaterial('#7bc67b', { emissive: new pc.Color(0.1, 0.4, 0.1) });
  const outside = colorMaterial('#6b7280');
  // A grid of small cubes; each turns green while the scout camera's frustum contains it.
  const cubes: pc.Entity[] = [];
  for (let x = -9; x <= 9; x += 2) {
    for (let z = -9; z <= 9; z += 2) {
      const cube = addShape(app, 'box', '#6b7280', [x, 0.4, z], 0.8);
      cubes.push(cube);
    }
  }

  // The overview camera looks straight down at everything.
  const overview = addCamera(app, { projection: pc.PROJECTION_ORTHOGRAPHIC, orthoHeight: 11 }, 'overview');
  overview.setPosition(0, 20, 0);
  overview.setEulerAngles(-90, 0, 0);

  // The scout turns on the spot; its picture-in-picture view shows what it sees.
  const scout = addCamera(app, { fov: 50, farClip: 12, nearClip: 1, priority: 1, rect: new pc.Vec4(0.66, 0.02, 0.32, 0.4) }, 'scout');
  scout.setPosition(0, 1, 8);
  const cam = scout.camera!;

  const readout = ctx.preview ? null : createPanel(el);
  const countText = readout?.readout();
  let yaw = 0;
  const forward = new pc.Vec3();
  const left = new pc.Vec3();
  const a = new pc.Vec3();
  const b = new pc.Vec3();
  const tint = new pc.Color(1, 0.9, 0.4);

  app.on('update', (dt: number) => {
    yaw += dt * 25;
    scout.setEulerAngles(0, 180 + Math.sin(yaw * 0.04) * 150, 0);

    let visible = 0;
    for (const cube of cubes) {
      const hit = cam.frustum.containsPoint(cube.getPosition());
      cube.render!.meshInstances[0]!.material = hit ? inside : outside;
      if (hit) visible++;
    }
    if (countText) countText.textContent = `${visible} of ${cubes.length} cubes in the frustum`;

    // Draw the view cone's edges in the overview (fov is vertical, so widen by the aspect).
    forward.copy(scout.forward);
    const half = Math.atan(Math.tan((cam.fov * pc.math.DEG_TO_RAD) / 2) * (stage.canvas.width * 0.32) / (stage.canvas.height * 0.4));
    for (const s of [-1, 1]) {
      left.set(forward.x * Math.cos(half * s) - forward.z * Math.sin(half * s), 0, forward.x * Math.sin(half * s) + forward.z * Math.cos(half * s));
      a.copy(scout.getPosition()).y = 0.1;
      b.copy(a).add(left.mulScalar(cam.farClip));
      app.drawLine(a, b, tint, false);
    }
  });

  if (readout) {
    readout.slider('scout fov', 20, 120, 1, cam.fov, (v) => (cam.fov = v));
    readout.slider('scout farClip', 4, 24, 1, cam.farClip, (v) => (cam.farClip = v));
  }

  return () => stage.dispose();
};

export default mount;

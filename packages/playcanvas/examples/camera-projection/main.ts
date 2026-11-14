// Camera projection: perspective with fov, or orthographic with orthoHeight
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, floor: 30 });
  const { app, camera } = scene;
  const cam = camera.camera!;
  camera.setPosition(5, 5, 9);
  camera.lookAt(0, 0.5, -3);

  // Identical pillars at growing distance: perspective shrinks them, orthographic does not.
  const colours = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6'];
  colours.forEach((c, i) => addShape(app.root, 'cylinder', material(c), [(i % 2 ? 1 : -1) * 1.5, 1, -i * 3], [1.2, 2, 1.2]));

  const setProjection = (p: number): void => {
    cam.projection = p;
  };
  if (ctx.preview) {
    // Cards cycle by themselves: perspective, then orthographic, with a gentle zoom.
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      setProjection(Math.floor(t / 3) % 2 ? pc.PROJECTION_ORTHOGRAPHIC : pc.PROJECTION_PERSPECTIVE);
      cam.fov = 55 + Math.sin(t) * 10;
      cam.orthoHeight = 6 + Math.sin(t) * 1.5;
    });
  } else {
    const panel = createPanel(el);
    const modes = ['perspective', 'orthographic'] as const;
    panel.select('projection', modes, 'perspective', (v) => setProjection(v === 'perspective' ? pc.PROJECTION_PERSPECTIVE : pc.PROJECTION_ORTHOGRAPHIC));
    panel.slider('fov (perspective)', 15, 120, 1, cam.fov, (v) => (cam.fov = v));
    panel.slider('orthoHeight (orthographic)', 1, 15, 0.1, cam.orthoHeight, (v) => (cam.orthoHeight = v));
    panel.row();
    panel.check('horizontalFov', false, (on) => (cam.horizontalFov = on));
  }

  return () => scene.dispose();
};

export default mount;

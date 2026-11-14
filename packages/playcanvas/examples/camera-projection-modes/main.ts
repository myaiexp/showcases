// Projection: perspective or orthographic, fov, orthoHeight and the aspect ratio
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.32);
  addSun(app, 50, 30);
  addGround(app, '#3a4152', 40);

  // A row of identical boxes running away from the camera: perspective shrinks them, ortho does not.
  for (let i = 0; i < 7; i++) addShape(app, 'box', i % 2 ? '#4ab3e8' : '#e8794a', [-6 + i * 2, 0.5, -i * 2 + 2]);

  const camera = addCamera(app);
  const cam = camera.camera!;
  const orbit = createOrbit(app, camera, {
    target: new pc.Vec3(0, 0.5, -3), distance: 14, pitch: -20, yaw: 20, autoRotate: 0, interactive: !ctx.preview,
  });
  cam.orthoHeight = 5; // half-height of the view in world units

  // pc.PROJECTION_PERSPECTIVE (default) | pc.PROJECTION_ORTHOGRAPHIC
  const setOrtho = (on: boolean): void => {
    cam.projection = on ? pc.PROJECTION_ORTHOGRAPHIC : pc.PROJECTION_PERSPECTIVE;
  };

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      // Cards sway and flip between the two projections by themselves.
      orbit.yaw = 20 + Math.sin(t * 0.8) * 30;
      setOrtho(Math.floor(t / 3) % 2 === 1);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('projection', ['perspective', 'orthographic'] as const, 'perspective', (v) => setOrtho(v === 'orthographic'));
    panel.slider('fov', 10, 120, 1, cam.fov, (v) => (cam.fov = v));
    panel.check('horizontalFov', false, (on) => (cam.horizontalFov = on));
    panel.slider('orthoHeight', 1, 12, 0.5, cam.orthoHeight, (v) => (cam.orthoHeight = v));
    panel.row();
    // ASPECT_AUTO follows the canvas; ASPECT_MANUAL uses aspectRatio and stretches the image.
    panel.select('aspectRatioMode', ['ASPECT_AUTO', 'ASPECT_MANUAL'] as const, 'ASPECT_AUTO', (v) => {
      cam.aspectRatioMode = v === 'ASPECT_AUTO' ? pc.ASPECT_AUTO : pc.ASPECT_MANUAL;
    });
    panel.slider('aspectRatio', 0.4, 3, 0.05, 1.5, (v) => (cam.aspectRatio = v));
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;

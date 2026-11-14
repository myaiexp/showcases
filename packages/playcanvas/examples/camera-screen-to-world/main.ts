// screenToWorld turns a 2D screen point into a 3D point at a set distance
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { input: false });
  const { app, canvas } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30, { castShadows: true, shadowDistance: 40 });
  addGround(app, '#3a4152', 30);
  for (let i = 0; i < 6; i++) addShape(app, 'box', '#4b5568', [-5 + i * 2, 0.5, -2 - (i % 2) * 3]);

  // The probe camera whose screen we sample; a second camera watches from the side.
  const camera = addCamera(app, { fov: 50, rect: new pc.Vec4(0, 0, 0.5, 1) }, 'probe');
  camera.setPosition(0, 3, 9);
  camera.lookAt(0, 1, 0);
  const watcher = addCamera(app, { fov: 50, rect: new pc.Vec4(0.5, 0, 0.5, 1), priority: 1, clearColor: new pc.Color(0.12, 0.13, 0.18) }, 'watcher');
  const orbit = createOrbit(app, watcher, { target: new pc.Vec3(0, 1.5, 3), distance: 16, yaw: 70, pitch: -25, autoRotate: 0, interactive: false });

  const marker = addShape(app, 'sphere', '#ff4d6d', [0, 1, 0], 0.5, { castShadows: false });
  marker.render!.meshInstances[0]!.material = (() => {
    const m = new pc.StandardMaterial();
    m.emissive = new pc.Color(1, 0.3, 0.4);
    m.useLighting = false;
    m.update();
    return m;
  })();

  // The point on screen, in CSS pixels from the top-left of the canvas: the pointer when
  // there is one, a sweeping path otherwise.
  const pointer = { x: 0, y: 0, last: -10 };
  const onMove = (e: PointerEvent): void => {
    const box = canvas.getBoundingClientRect();
    pointer.x = e.clientX - box.left;
    pointer.y = e.clientY - box.top;
    pointer.last = performance.now() / 1000;
  };
  canvas.addEventListener('pointermove', onMove);

  const state = { distance: 8 };
  const from = new pc.Vec3();
  const to = new pc.Vec3();
  const cam = camera.camera!;
  const colour = new pc.Color(1, 0.8, 0.3);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const w = canvas.clientWidth / 2;
    const h = canvas.clientHeight;
    const live = performance.now() / 1000 - pointer.last < 2 && pointer.x < w;
    const x = live ? pointer.x : w * (0.5 + Math.sin(t * 0.9) * 0.4);
    const y = live ? pointer.y : h * (0.5 + Math.sin(t * 1.3) * 0.3);
    // The whole ray: its ends sit on the near and far planes.
    cam.screenToWorld(x, y, cam.nearClip, from);
    cam.screenToWorld(x, y, cam.farClip, to);
    app.drawLine(from.clone().add(new pc.Vec3(0, -0.02, 0)), to, colour, false);
    // And one point on it, state.distance units from the camera.
    marker.setPosition(cam.screenToWorld(x, y, state.distance));
    orbit.yaw += dt * 4;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('distance (z)', 1, 25, 0.5, state.distance, (v) => (state.distance = v));
    panel.readout('move the pointer over the left half');
  }

  return () => {
    canvas.removeEventListener('pointermove', onMove);
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;

// shadowBounds: fit a directional light's shadow map to a box on a character
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

/** Draws a bounding box as 12 line segments. */
function drawBox(app: pc.AppBase, box: pc.BoundingBox, points: pc.Vec3[], colours: pc.Color[]): void {
  const { center: c, halfExtents: h } = box;
  const corner = (i: number): pc.Vec3 => new pc.Vec3(c.x + (i & 1 ? h.x : -h.x), c.y + (i & 2 ? h.y : -h.y), c.z + (i & 4 ? h.z : -h.z));
  let n = 0;
  for (let i = 0; i < 8; i++) {
    for (const bit of [1, 2, 4]) {
      if (i & bit) continue;
      points[n++]!.copy(corner(i));
      points[n++]!.copy(corner(i | bit));
    }
  }
  app.drawLines(points, colours, true);
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color(0.28, 0.3, 0.36);

  // A deliberately small shadow map spread over a big view: the default fit is blocky.
  const sun = addSun(app, 55, 30, { castShadows: true, shadowResolution: 512, shadowDistance: 60, normalOffsetBias: 0.04, intensity: 1.6 });
  const light = sun.light!;
  addGround(app, '#566077', 120);

  const character = addShape(app, 'capsule', '#f2c14e', [0, 1, 0], [1, 2, 1]);
  for (const [x, z] of [[-12, -6], [14, 3], [-20, 12], [9, -16]]) addShape(app, 'cylinder', '#cfd5e1', [x!, 3, z!], [1.4, 6, 1.4]);

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.62, 0.8), farClip: 300 });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 1, 0), distance: 22, pitch: -38, yaw: 20, autoRotate: 0, interactive: !ctx.preview });

  const state = { fitted: true, show: true };
  const bounds = new pc.BoundingBox(new pc.Vec3(), new pc.Vec3(3, 2.5, 3));
  const lines: pc.Vec3[] = Array.from({ length: 24 }, () => new pc.Vec3());
  const colours: pc.Color[] = Array.from({ length: 24 }, () => new pc.Color(0.4, 1, 0.5));
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // The character walks a figure of eight; some of it passes near the pillars.
    character.setPosition(Math.sin(t * 0.5) * 12, 1, Math.sin(t) * 6);
    orbit.yaw = 20 + Math.sin(t * 0.15) * 20;
    if (ctx.preview) state.fitted = Math.floor(t / 4) % 2 === 0;
    if (state.fitted) {
      // The light keeps a copy of the bounds, so move them and set them again.
      bounds.center.copy(character.getPosition());
      light.shadowBounds = bounds;
      if (state.show) {
        drawBox(app, bounds, lines, colours);
      }
    } else {
      // null returns to shadows fitted to each camera.
      light.shadowBounds = null as unknown as pc.BoundingBox;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('shadowBounds follow the character', true, (on) => (state.fitted = on));
    panel.check('draw the bounds', true, (on) => (state.show = on));
    panel.slider('bounds half size', 1, 8, 0.5, 3, (v) => bounds.halfExtents.set(v, v * 0.8, v));
    panel.readout('casters outside the bounds, like the far pillars, cast no shadow while fitted');
  }

  return () => {
    orbit.dispose();
    stage.dispose();
  };
};

export default mount;

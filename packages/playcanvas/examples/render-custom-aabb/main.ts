// Render customAabb: the bounds used for culling, drawn as a wire box
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

// Twelve edges of an axis-aligned box, as immediate lines.
function wireBox(app: pc.AppBase, lo: pc.Vec3, hi: pc.Vec3): void {
  const c = (x: number, y: number, z: number): pc.Vec3 => new pc.Vec3(x ? hi.x : lo.x, y ? hi.y : lo.y, z ? hi.z : lo.z);
  for (let i = 0; i < 8; i++) {
    const [x, y, z] = [i & 1, (i >> 1) & 1, (i >> 2) & 1];
    for (const [dx, dy, dz] of [[1, 0, 0], [0, 1, 0], [0, 0, 1]] as const) {
      if ((dx && x) || (dy && y) || (dz && z)) continue;
      app.drawLine(c(x, y, z), c(x + dx, y + dy, z + dz), pc.Color.YELLOW, false);
    }
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false });
  const { app, camera } = scene;
  camera.setPosition(0, 0, 4);
  camera.camera!.fov = 60;

  // An entity at scale 1, so the local box and the world box are the same size.
  const ball = addShape(app.root, 'sphere', material('#e8794a', { gloss: 0.6 }), [0, 0, 0], 1);
  const render = ball.render!;
  const halfExtents = new pc.Vec3(0.5, 0.5, 0.5);
  const apply = (): void => {
    // The mesh keeps its own shape; only the box the engine culls against changes.
    render.customAabb = new pc.BoundingBox(new pc.Vec3(0, 0, 0), halfExtents.clone());
  };
  apply();

  const lo = new pc.Vec3();
  const hi = new pc.Vec3();
  let show = true;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // Sweeps across the view and out of it at both sides.
    ball.setLocalPosition(Math.sin(t * 0.8) * 4.2, Math.sin(t * 1.7) * 0.4, 0);
    ball.rotate(0, 60 * dt, 0);
    if (show) {
      const p = ball.getPosition();
      lo.sub2(p, halfExtents);
      hi.add2(p, halfExtents);
      wireBox(app, lo, hi);
    }
    if (ctx.preview) {
      halfExtents.set(0.5, 0.5, 0.5).mulScalar(0.2 + (Math.sin(t * 0.4) + 1) * 0.9);
      apply();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('half extents', 0.05, 2, 0.05, 0.5, (v) => {
      halfExtents.set(v, v, v);
      apply();
    });
    panel.check('draw the box', true, (on) => (show = on));
    panel.row();
    panel.readout('The sphere is culled once the yellow box leaves the view, whatever the mesh itself covers.');
  }

  return () => scene.dispose();
};

export default mount;

// WireRenderer: every shape, drawn each frame, with state kept on the renderer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 17, pitch: -42, autoRotate: 8, clearColor: new pc.Color(0.08, 0.09, 0.12) });
  const { app } = rig;

  // A translucent slab through the middle row: shapes behind it are hidden while depthTest is on.
  addMesh(app, 'box', pbrMaterial('#3a4152', { opacity: 0.5, blendType: pc.BLEND_NORMAL, useLighting: false }), [0, 0, 0], [13, 0.1, 1.2]);

  // Two renderers, two sets of state: the second one ignores depth and draws on top.
  const wire = new pc.WireRenderer(app);
  const xray = new pc.WireRenderer(app);
  xray.depthTest = false;

  // A camera that never renders (disabled) and a light, only to be drawn as wire shapes.
  const observer = new pc.Entity('observer');
  observer.addComponent('camera', { enabled: false, fov: 45, nearClip: 0.4, farClip: 2.2 });
  app.root.addChild(observer);
  const spot = new pc.Entity('spot');
  spot.addComponent('light', { type: 'spot', range: 2.2, outerConeAngle: 40, innerConeAngle: 25, color: new pc.Color(1, 0.8, 0.3), layers: [] });
  app.root.addChild(spot);

  const V = (x: number, y: number, z: number): pc.Vec3 => new pc.Vec3(x, y, z);
  const o = V(0, 0, 0);
  const shapes: ((w: pc.WireRenderer, t: number) => void)[] = [
    (w) => w.line(V(-1, -1, 0), V(1, 1, 0)),
    (w) => w.lines([V(-1, -1, 0), V(1, -1, 0), V(-1, 0, 0), V(1, 0, 0), V(-1, 1, 0), V(1, 1, 0)], [pc.Color.RED, pc.Color.YELLOW, pc.Color.GREEN, pc.Color.CYAN, pc.Color.BLUE, pc.Color.MAGENTA]),
    (w) => w.polyline([V(-1, -1, 0), V(-0.4, 1, 0), V(0.4, -1, 0), V(1, 1, 0)]),
    (w) => w.loop([V(-1, -1, 0), V(0, 1.1, 0), V(1, -1, 0)]),
    (w) => w.boxMinMax(V(-1, -0.7, -0.7), V(1, 0.7, 0.7)),
    (w) => w.sphere(o, 1),
    (w) => w.circle(o, V(0, 1, 0), 1),
    (w) => w.cylinder(V(0, -1, 0), V(0, 1, 0), 0.7),
    (w) => w.capsule(V(0, -0.6, 0), V(0, 0.6, 0), 0.6),
    (w) => w.cone(V(0, 1, 0), V(0, -1, 0), 30, 2),
    (w) => w.plane(o, V(0, 1, 0), 2),
    (w, t) => {
      w.point(V(-0.8, 0, 0), 0.5);
      w.arrow(V(-0.6, -0.8, 0), V(0.9 * Math.cos(t), 0.9 * Math.sin(t), 0));
    },
    (w) => w.axes(new pc.Mat4().setScale(1, 1, 1), 1.4),
    (w) => w.frustum(observer.camera!),
    (w) => w.light(spot.light!),
  ];

  const m = new pc.Mat4();
  let t = 0;
  let spin = true;
  app.on('update', (dt: number) => {
    if (spin) t += dt;
    shapes.forEach((draw, i) => {
      const cell = { x: ((i % 5) - 2) * 2.9, z: (Math.floor(i / 5) - 1) * 3.2 };
      // transform: every shape below is drawn in this cell's own space (and spins in it).
      m.setTRS(V(cell.x, 0.4, cell.z), new pc.Quat().setFromEulerAngles(0, t * 40 + i * 20, 0), pc.Vec3.ONE);
      const target = i % 2 ? xray : wire;
      target.transform = m;
      target.color = new pc.Color().fromString(['#ff8a5c', '#6bd6ff', '#8dff8a', '#ffe066', '#d28bff'][i % 5]!);
      draw(target, t);
      target.transform = null;
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('segments (circle detail)', 4, 48, 1, 20, (v) => (wire.segments = xray.segments = v));
    panel.check('spin', true, (on) => (spin = on));
    panel.check('solid renderer depthTest', true, (on) => (wire.depthTest = on));
    panel.readout('odd cells use the second renderer (depthTest off): drawn over the slab');
  }
  return () => {
    rig.dispose();
  };
};

export default mount;

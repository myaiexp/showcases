// XRSPACE constants: where each reference space puts its origin
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape } from '../../shared/xr.ts';

const SPACES = [pc.XRSPACE_LOCAL, pc.XRSPACE_LOCALFLOOR, pc.XRSPACE_BOUNDEDFLOOR, pc.XRSPACE_UNBOUNDED, pc.XRSPACE_VIEWER] as const;
type Space = (typeof SPACES)[number];

const NOTES: Record<Space, string> = {
  local: 'Seated (3DoF or 6DoF): the origin is the viewer at the start of the session, head height.',
  'local-floor': 'Room scale or seated: the origin is on the floor below the viewer at the start.',
  'bounded-floor': 'Room scale: like local-floor, with a boundary rectangle the user can walk inside.',
  unbounded: 'Room scale without limits: no fixed floor or boundary, the origin drifts with tracking.',
  viewer: 'The origin is the head itself and moves with it: every pose is relative to the viewer.',
};
const SUITABLE: Record<Space, string> = {
  local: 'seated',
  'local-floor': 'room scale and seated',
  'bounded-floor': 'room scale',
  unbounded: 'room scale',
  viewer: 'neither (used for hit tests from the viewer)',
};

const AXES: [pc.Vec3, pc.Color][] = [
  [new pc.Vec3(1, 0, 0), new pc.Color(1, 0.3, 0.3)],
  [new pc.Vec3(0, 1, 0), new pc.Color(0.4, 1, 0.4)],
  [new pc.Vec3(0, 0, 1), new pc.Color(0.4, 0.6, 1)],
];

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0.9, 0), distance: 5.5, pitch: -20 });
  const { app } = scene;
  let space: Space = ctx.preview ? 'bounded-floor' : 'local-floor';

  // The simulated viewer: a body and head that sway, 1.6 m tall.
  const body = xrShape(app.root, 'capsule', xrMaterial('#8a93a8'), [0, 0.75, 0], [0.35, 1.5, 0.35]);
  const head = xrShape(app.root, 'sphere', xrMaterial('#f2c14e'), [0, 1.6, 0], 0.25);
  const start = new pc.Vec3(0, 1.6, 0);
  const headPos = new pc.Vec3();
  const origin = new pc.Vec3();
  const tip = new pc.Vec3();
  const dots: pc.Entity[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    dots.push(xrShape(app.root, 'sphere', xrMaterial('#a78bfa'), [Math.cos(a) * 3.2, 0.05, Math.sin(a) * 3.2], 0.1));
  }
  const corners = [new pc.Vec3(-1.25, 0.02, -1), new pc.Vec3(1.25, 0.02, -1), new pc.Vec3(1.25, 0.02, 1), new pc.Vec3(-1.25, 0.02, 1)];
  const boundary = new pc.Color(1, 0.8, 0.3);
  const grey = new pc.Color(0.5, 0.5, 0.5);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const sway = space === 'unbounded' || space === 'bounded-floor' ? 1 : 0.3;
    headPos.set(Math.sin(t * 0.8) * 0.8 * sway, 1.6 - Math.abs(Math.sin(t * 1.6)) * 0.05, Math.cos(t * 0.6) * 0.5 * sway);
    body.setLocalPosition(headPos.x, 0.75, headPos.z);
    head.setLocalPosition(headPos);
    if (space === 'viewer') origin.copy(headPos);
    else if (space === 'local') origin.copy(start);
    else origin.set(0, 0, 0);
    for (const [dir, colour] of AXES) {
      tip.copy(dir).mulScalar(0.8).add(origin);
      app.drawLine(origin, tip, colour);
    }
    // The boundary exists only in a bounded space; unbounded content stays anchored in the world.
    if (space === 'bounded-floor') for (let i = 0; i < 4; i++) app.drawLine(corners[i]!, corners[(i + 1) % 4]!, boundary);
    dots.forEach((d) => (d.enabled = space === 'unbounded'));
    if (space === 'local') {
      tip.set(origin.x, 0, origin.z);
      app.drawLine(tip, origin, grey);
    }
  });

  if (ctx.preview) return () => scene.dispose();

  const panel = createPanel(el);
  const note = panel.readout('');
  const show = (): void => {
    note.textContent = `${space}: ${NOTES[space]} Suitable for ${SUITABLE[space]}.`;
  };
  panel.select('XRSPACE', SPACES, space, (v) => {
    space = v;
    show();
  });
  show();
  const entry = addXrEntry(el, panel, scene, [
    {
      type: pc.XRTYPE_VR,
      get space() {
        return space;
      },
      label: 'Enter VR',
    },
  ]);
  return () => {
    entry.dispose();
    scene.dispose();
  };
};

export default mount;

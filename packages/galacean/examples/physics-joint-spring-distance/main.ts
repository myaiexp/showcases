// SpringJoint: no force between minDistance and maxDistance, spring outside
import { SpringJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { line, marker, polyline, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 0, 12], target: [0, 0, 0], floor: false, hint: 'Gravity is off so the band itself is visible.' });
  const centre = new Vector3(0, 0, 0);
  marker(w.root, unlit(w.engine, PALETTE.white), 0.3).set(centre);
  const inner = polyline(w.root, unlit(w.engine, PALETTE.cyan), 48, 0.03);
  const outer = polyline(w.root, unlit(w.engine, PALETTE.amber), 48, 0.03);
  const rope = line(w.root, unlit(w.engine, PALETTE.white), 0.03);
  const band = { min: 1.5, max: 3, tolerance: 0.25 };
  let bob: ReturnType<typeof ball> | undefined;
  let joint: SpringJoint | undefined;
  const circle = (r: number): Vector3[] => Array.from({ length: 48 }, (_, i) => new Vector3(Math.cos((i / 48) * Math.PI * 2) * r, Math.sin((i / 48) * Math.PI * 2) * r, 0));
  const round = rounds(w, w.stage.preview ? 9 : 1e9, (n, holder) => {
    const inside = n % 2 === 0;
    bob = ball(holder, [inside ? 0.5 : 4.5, 0.3, 0], 0.3, PALETTE.green);
    bob.body.useGravity = false;
    bob.body.linearDamping = 0.15;
    bob.body.linearVelocity = new Vector3(0, inside ? 0.6 : 0.8, 0);
    joint = bob.entity.addComponent(SpringJoint);
    joint.automaticConnectedAnchor = false;
    joint.connectedAnchor = centre.clone();
    joint.minDistance = band.min;
    joint.maxDistance = band.max;
    joint.tolerance = band.tolerance;
    joint.stiffness = 30;
    joint.damping = 1;
    inner.set(circle(band.min), true);
    outer.set(circle(band.max), true);
  });
  tick(w.root, () => {
    if (!bob || !joint) return;
    rope.set(centre, bob.entity.transform.worldPosition);
    const d = Vector3.distance(centre, bob.entity.transform.worldPosition);
    const state = d < band.min - band.tolerance ? 'pushed out' : d > band.max + band.tolerance ? 'pulled in' : 'free';
    w.say(`distance ${d.toFixed(2)} (${band.min} .. ${band.max}, tolerance ${band.tolerance})  ${state}`);
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'minDistance', 0, 2.5, 0.1, band.min, (v) => {
      band.min = v;
      round.restart();
    });
    slider(w.stage.bar, 'maxDistance', 2.5, 5, 0.1, band.max, (v) => {
      band.max = v;
      round.restart();
    });
    slider(w.stage.bar, 'tolerance', 0, 1, 0.05, band.tolerance, (v) => {
      band.tolerance = v;
      round.restart();
    });
  }
  return w.stage.dispose;
};

export default mount;

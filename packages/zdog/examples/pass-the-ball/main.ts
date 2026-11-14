// Pass the ball: a ball hops between two turntables by changing parent
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';

const SPOT = { x: 26, z: 0 }; // where the ball sits on a turntable, in the turntable's own space
const TOP = -7; // y of a turntable top surface (half the disc length above its centre)
const BALL = 10; // ball radius

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The ball is re-parented in mid-air, so it rides each turntable round.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.15,
    rotate: { x: -0.45, y: -0.3 },
    dragRotate: !stage.preview,
  });

  const table = (x: number, color: string, top: string, dir: number) => {
    // a Group draws the disc, then the pegs, then whatever sits on it: the ball is never hidden by the top face
    const anchor = new Zdog.Group({ addTo: illo, translate: { x, y: 30 } });
    // a Cylinder lies along z; turning it a quarter lays it flat like a record
    const disc = new Zdog.Cylinder({
      addTo: anchor, diameter: 100, length: 14, rotate: { x: Math.PI / 2 }, stroke: false,
      color, frontFace: top, backface: color,
    });
    // pegs show the spin
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Zdog.TAU;
      new Zdog.Shape({ addTo: anchor, translate: { x: Math.cos(a) * 38, y: TOP - 2, z: Math.sin(a) * 38 }, stroke: 6, color: '#fff' });
    }
    return { anchor, disc, dir };
  };
  const left = table(-75, '#a35ac9', '#C25', 1);
  const right = table(75, '#EA0', '#E62', -1);
  const tables = [left, right];

  const ball = new Zdog.Shape({ addTo: left.anchor, translate: { x: SPOT.x, y: TOP - BALL, z: SPOT.z }, stroke: BALL * 2, color: '#fff' });
  let holder = 0;
  let hop: { from: number; to: number; start: number } | null = null;
  let now = 0;

  // world position of a point on a turntable: rotate around y, then add the turntable's translate
  const world = (t: (typeof tables)[number], lx: number, lz: number) => {
    const c = Math.cos(t.anchor.rotate.y);
    const s = Math.sin(t.anchor.rotate.y);
    return { x: t.anchor.translate.x + lx * c - lz * s, z: lz * c + lx * s };
  };
  const start = (): void => {
    if (hop) return;
    const from = holder;
    const w = world(tables[from]!, SPOT.x, SPOT.z);
    // take the ball off its turntable and put it on the scene itself
    tables[from]!.anchor.removeChild(ball);
    illo.addChild(ball);
    ball.translate.x = w.x;
    ball.translate.z = w.z;
    hop = { from, to: 1 - from, start: now };
  };

  const info = stage.bar ? readout(stage.bar) : null;
  if (stage.bar) button(stage.bar, 'Pass the ball', start);
  stage.every(stage.preview ? 2200 : 3500, start);

  stage.loop((dt, t) => {
    now = t;
    for (const tb of tables) tb.anchor.rotate.y += dt * 1.1 * tb.dir;
    if (hop) {
      const q = Math.min(1, (t - hop.start) / 0.9);
      const dest = tables[hop.to]!;
      const a = world(tables[hop.from]!, SPOT.x, SPOT.z);
      const b = world(dest, SPOT.x, SPOT.z);
      // aim at the spot on the destination as it is now
      ball.translate.x = Zdog.lerp(a.x, b.x, q);
      ball.translate.z = Zdog.lerp(a.z, b.z, q);
      ball.translate.y = 30 + TOP - BALL - 70 * 4 * q * (1 - q);
      if (q >= 1) {
        // land: out of the scene, into the turntable, at the spot in its own space
        illo.removeChild(ball);
        dest.anchor.addChild(ball);
        ball.translate.set({ x: SPOT.x, y: TOP - BALL, z: SPOT.z });
        holder = hop.to;
        hop = null;
      }
    }
    if (info) info.textContent = hop ? 'ball: in the air (child of the scene)' : `ball: child of the ${holder === 0 ? 'left' : 'right'} turntable`;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

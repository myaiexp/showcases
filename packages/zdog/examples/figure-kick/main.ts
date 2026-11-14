// Figure kick: the finished tutorial character, legs and arms swinging from their joints
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const GOLD = '#EA0';
const PURPLE = '#a35ac9';
const MOVES = ['kick', 'walk', 'march'] as const;
type Move = (typeof MOVES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 4.8,
    rotate: { y: -TAU / 8 },
    dragRotate: true,
  });

  const hipX = 3;
  const hips = new Zdog.Shape({ addTo: illo, path: [{ x: -hipX }, { x: hipX }], translate: { y: 2 }, stroke: 4, color: PURPLE });
  const spine = new Zdog.Anchor({ addTo: hips, rotate: { x: TAU / 8 } });
  const chest = new Zdog.Shape({ addTo: spine, path: [{ x: -1.5 }, { x: 1.5 }], translate: { y: -6.5 }, stroke: 9, color: '#C25' });
  const head = new Zdog.Shape({ addTo: chest, stroke: 12, translate: { y: -9.5 }, color: GOLD });
  const eye = new Zdog.Ellipse({
    addTo: head, diameter: 2, quarters: 2, translate: { x: -2, y: 1, z: 4.5 },
    rotate: { z: -TAU / 4 }, color: '#4a1f66', stroke: 0.5, backface: false,
  });
  eye.copy({ translate: { x: 2, y: 1, z: 4.5 } });
  new Zdog.Ellipse({
    addTo: head, diameter: 3, quarters: 2, translate: { y: 2.5, z: 4.5 }, rotate: { z: TAU / 4 },
    closed: true, color: '#FDB', stroke: 0.5, fill: true, backface: false,
  });

  // two legs, each with a foot added to it; the foot is flat (x TAU/4) when the leg hangs
  const makeLeg = (x: number): { leg: Zdog.Shape; foot: Zdog.RoundedRect } => {
    const leg = new Zdog.Shape({ addTo: hips, path: [{ y: 0 }, { y: 12 }], translate: { x }, color: PURPLE, stroke: 4 });
    const foot = new Zdog.RoundedRect({
      addTo: leg, width: 2, height: 4, cornerRadius: 1, translate: { y: 14, z: 2 },
      rotate: { x: TAU / 4 }, color: '#C25', fill: true, stroke: 4,
    });
    return { leg, foot };
  };
  const left = makeLeg(-hipX);
  const right = makeLeg(hipX);

  // arm: upper arm on the chest, forearm on the upper arm, hand on the forearm
  const makeArm = (x: number): { upper: Zdog.Shape; fore: Zdog.Shape } => {
    const upper = new Zdog.Shape({ addTo: chest, path: [{ y: 0 }, { y: 6 }], translate: { x, y: -2 }, color: PURPLE, stroke: 4 });
    const fore = new Zdog.Shape({ addTo: upper, path: [{ y: 0 }, { y: 6 }], translate: { y: 6 }, color: GOLD, stroke: 4 });
    new Zdog.Shape({ addTo: fore, translate: { y: 6, z: 1 }, stroke: 6, color: GOLD });
    return { upper, fore };
  };
  const armL = makeArm(-5);
  const armR = makeArm(5);

  let move: Move = 'kick';
  let speed = 1;
  if (stage.bar) {
    select(stage.bar, 'move', MOVES, (v) => { move = v; }, move);
    slider(stage.bar, 'speed', 0.3, 2.5, 0.1, speed, (v) => { speed = v; });
  }

  let phase = 0;
  stage.loop((dt, t) => {
    phase += dt * speed * 3;
    const s = Math.sin(phase);
    let l = 0;
    let r = 0;
    let arms = 0;
    let bend = TAU / 12;
    if (stage.preview) move = MOVES[Math.floor(t / 4) % MOVES.length]!;
    if (move === 'kick') {
      l = (0.5 + 0.5 * s) * (TAU / 3.2); // left leg kicks forward and back
      r = -TAU / 24;
      arms = 0.4 * s;
    } else if (move === 'walk') {
      l = 0.7 * s;
      r = -0.7 * s;
      arms = -0.6 * s;
    } else {
      l = Math.max(0, s) * (TAU / 4.2); // knees up
      r = Math.max(0, -s) * (TAU / 4.2);
      arms = -0.9 * s;
      bend = TAU / 6;
    }
    left.leg.rotate.x = l;
    right.leg.rotate.x = r;
    // keep each foot flat to the ground as its leg swings
    left.foot.rotate.x = TAU / 4 - l;
    right.foot.rotate.x = TAU / 4 - r;
    armL.upper.rotate.x = arms;
    armR.upper.rotate.x = -arms;
    armL.fore.rotate.x = bend;
    armR.fore.rotate.x = bend;
    hips.translate.y = 2 + 0.5 * Math.abs(s);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

// Motion: the same ten distances on a lopsided curve, solved finely and coarsely
import { Ellipse, Group, Leafer, Path } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: precision 1. Right: precision 150. Dots sit at 10%, 20%... of the path length; the coarse copy puts them in the wrong places.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = Math.min(stage.width / 2 / 330, stage.height / 290);
  const say = label(stage, '', true);
  const sets: { x: number; y: number }[][] = [];

  [1, 150].forEach((motionPrecision, i) => {
    const group = new Group({ x: stage.width * (i ? 0.52 : 0.02) + 30 * k, y: 120 * k, scale: k });
    const curve = new Path({
      path: 'M 0 150 C 330 -120, -180 -120, 140 150', // very uneven parameterisation
      stroke: 'rgba(0,0,0,0.25)',
      strokeWidth: 3 / k,
      motionPath: true,
      motionPrecision,
    });
    group.add(curve);
    const pts: { x: number; y: number }[] = [];
    for (let n = 1; n < 10; n++) {
      const dot = new Ellipse({ width: 12 / k * 1.2, height: 12 / k * 1.2, around: 'center', fill: i ? '#ff4b4b' : '#32cd79', motion: { type: 'percent', value: n / 10 } });
      group.add(dot);
      pts.push(curve.getMotionPoint({ type: 'percent', value: n / 10 }));
    }
    sets.push(pts);
    leafer.add(group);
  });
  const off = Math.max(...sets[0]!.map((p, n) => Math.hypot(p.x - sets[1]![n]!.x, p.y - sets[1]![n]!.y)));
  say(`largest difference between the copies: ${off.toFixed(1)} px`);
  return stage.dispose;
};

export default mount;

// Paths: the commands M, L, Q, C, A and Z, drawn one at a time with their control points
import { Canvas, Circle, Line, Path, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Pt = [number, number];
interface Step {
  d: string;
  note: string;
  from?: Pt;
  ctrl?: Pt[];
  to?: Pt;
}

const STEPS: Step[] = [
  { d: 'M 30 160', note: 'M: move the pen, draw nothing', to: [30, 160] },
  { d: 'L 80 60', note: 'L: straight line to a point', from: [30, 160], to: [80, 60] },
  { d: 'Q 130 10 180 60', note: 'Q: quadratic curve, one control point', from: [80, 60], ctrl: [[130, 10]], to: [180, 60] },
  { d: 'C 210 90 150 140 200 160', note: 'C: cubic curve, two control points', from: [180, 60], ctrl: [[210, 90], [150, 140]], to: [200, 160] },
  { d: 'A 40 40 0 0 0 280 140', note: 'A: arc, rx ry rotation large-arc sweep x y', from: [200, 160], to: [280, 140] },
  { d: 'Z', note: 'Z: close back to the start' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 200], hint: 'One path, built command by command. Dots are the points the pen passes through; hollow dots and dashed lines are the control points of a curve.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  let drawn: FabricObject[] = [];
  const show = (count: number, markers: boolean): void => {
    canvas.remove(...drawn);
    const upto = STEPS.slice(0, count);
    const closed = count === STEPS.length;
    const path = new Path(upto.map((s) => s.d).join(' '), {
      fill: closed ? 'rgba(46,158,91,0.3)' : 'transparent',
      stroke: '#1a6638',
      strokeWidth: 3,
      selectable: false,
      evented: false,
    });
    drawn = [path];
    if (markers) {
      const step = upto[count - 1]!;
      const quiet = { selectable: false, evented: false } as const;
      const guide = (a: Pt, b: Pt): void => void drawn.push(new Line([...a, ...b], { stroke: '#8e5bd6', strokeWidth: 1, strokeDashArray: [4, 3], ...quiet }));
      if (step.from && step.ctrl) {
        guide(step.from, step.ctrl[0]!);
        guide(step.ctrl.at(-1)!, step.to!);
      }
      for (const c of step.ctrl ?? []) drawn.push(new Circle({ left: c[0], top: c[1], radius: 4, fill: '#f6f3ec', stroke: '#8e5bd6', strokeWidth: 2, ...quiet }));
      if (step.to) drawn.push(new Circle({ left: step.to[0], top: step.to[1], radius: 5, fill: '#e94b3c', ...quiet }));
    }
    canvas.add(...drawn);
    say(upto.at(-1)!.note);
    canvas.requestRenderAll();
  };
  show(STEPS.length, true);

  if (stage.bar) {
    let n = STEPS.length;
    let marks = true;
    slider(stage.bar, 'commands drawn', 1, STEPS.length, 1, n, (v) => show((n = v), marks));
    checkbox(stage.bar, 'control points', true, (v) => show(n, (marks = v)));
  } else {
    let i = 0;
    stage.every(900, () => show((i++ % STEPS.length) + 1, true));
  }

  return stage.dispose;
};

export default mount;

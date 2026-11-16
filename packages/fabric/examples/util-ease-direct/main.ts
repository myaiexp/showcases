// util.ease functions called directly as ease(t, b, c, d), plotted and scrubbed
import { Canvas, Point, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { select, slider } from '../../shared/controls.ts';
import { BLUE, GOLD, INK, RED, dot, label, overlay, seg } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

type Ease = (t: number, b: number, c: number, d: number) => number;
const eases = util.ease as unknown as Record<string, Ease>;
const NAMES = Object.keys(eases).filter((k) => k !== 'defaultEasing');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'An easing is a plain function: ease(t, b, c, d) with t the time so far, b the start value, c the change and d the duration. Here it is called by hand, with no animate(): scrub t and read the value it returns.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));
  const say = briefStatus(stage);
  const o = { name: 'easeOutBounce', t: 0.5 };
  const X0 = 40, X1 = 280, Y0 = 135, Y1 = 55; // plot box: t along x, value up the y axis
  const DUR = 1000, FROM = 40, TO = 280;

  overlay(canvas, (c) => {
    const fn = eases[o.name]!;
    seg(c, new Point(X0, Y0), new Point(X1, Y0), '#cfc9bb', 1);
    seg(c, new Point(X0, Y0), new Point(X0, Y1), '#cfc9bb', 1);
    seg(c, new Point(X0, Y1), new Point(X1, Y1), '#e5e0d3', 1, [3, 3]);
    c.strokeStyle = BLUE;
    c.lineWidth = 2.5;
    c.beginPath();
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * DUR;
      const y = Y0 + (Y1 - Y0) * fn(t, 0, 1, DUR);
      const x = X0 + ((X1 - X0) * i) / 80;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.stroke();
    const t = o.t * DUR;
    const v = fn(t, 0, 1, DUR);
    const p = new Point(X0 + (X1 - X0) * o.t, Y0 + (Y1 - Y0) * v);
    seg(c, new Point(p.x, Y0), p, '#bbb', 1, [3, 3]);
    dot(c, p, RED, 5);
    // the same call moving something: b = FROM, c = TO - FROM
    const x = fn(t, FROM, TO - FROM, DUR);
    seg(c, new Point(FROM, 170), new Point(TO, 170), '#cfc9bb', 1);
    dot(c, new Point(x, 170), GOLD, 8);
    label(c, `x = ease(${Math.round(t)}, ${FROM}, ${TO - FROM}, ${DUR})`, new Point(FROM - 8, 30), INK, 11);
    say(`${o.name}\nvalue ${v.toFixed(3)}`);
  });

  const redraw = (): void => canvas.requestRenderAll();
  if (stage.bar) {
    select(stage.bar, 'util.ease', NAMES, (v) => ((o.name = v), redraw()), o.name);
    slider(stage.bar, 't', 0, 1, 0.01, o.t, (v) => ((o.t = v), redraw()), (v) => `${Math.round(v * DUR)} ms`);
  } else {
    let i = NAMES.indexOf(o.name);
    stage.every(2400, () => (o.name = NAMES[++i % NAMES.length]!));
  }
  stage.loop((_dt, time) => {
    if (stage.preview) o.t = (time % 2.4) / 2.4;
    redraw();
  });
  return stage.dispose;
};

export default mount;

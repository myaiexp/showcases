// addFrames with names and groups; animate plays a name, a list, or a group
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = Array.from({ length: 40 }, (_, i) => i / 4);
  const wave = (k: number, f: (v: number) => number) => ({ data: [{ y: x.map((v) => f(v + k)) }] });

  await Plotly.newPlot(stage.div, [{ x, y: x.map(Math.sin), mode: 'lines', line: { width: 3, simplify: false } }], { template: stage.template, yaxis: { range: [-1.6, 1.6] } }, stage.config);

  // Two groups of named frames: sine phases and square-ish phases.
  await Plotly.addFrames(stage.div, [
    ...[0, 1, 2, 3].map((k) => ({ name: `sin-${k}`, group: 'sine', ...wave(k * 1.5, Math.sin) })),
    ...[0, 1, 2, 3].map((k) => ({ name: `sq-${k}`, group: 'square', ...wave(k * 1.5, (v) => Math.tanh(4 * Math.sin(v))) })),
  ]);

  const opts = { transition: { duration: 400 }, frame: { duration: 400, redraw: false } };
  const plays: [string, () => Promise<void>][] = [
    ["group 'sine'", () => Plotly.animate(stage.div, 'sine', opts)],
    ["group 'square'", () => Plotly.animate(stage.div, 'square', opts)],
    ["names ['sin-0', 'sq-2']", () => Plotly.animate(stage.div, ['sin-0', 'sq-2'], opts)],
  ];
  if (stage.bar) for (const [label, fn] of plays) button(stage.bar, `animate ${label}`, () => void fn());
  if (stage.preview) stage.every(2400, (i) => void plays[i % 2]![1]());

  return () => stage.dispose();
};

export default mount;

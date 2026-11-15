// High cardinality: the top N categories stay, everything else folds into one Other row
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(77);
const categories = Array.from({ length: 3000 }, (_, i) => ({ name: `item-${i + 1}`, count: Math.round(9000 / (i + 1) ** 0.85 + random() * 3) })).sort((a, b) => b.count - a.count);
const total = categories.reduce((s, c) => s + c.count, 0);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise the cutoff: bars leave Other one by one.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const options = (top: number) => {
    const lead = categories.slice(0, top);
    const rest = categories.slice(top).reduce((s, c) => s + c.count, 0);
    const rows = [...lead.map((c) => ({ name: c.name, count: c.count, other: false })), { name: `Other (${categories.length - top} more)`, count: rest, other: true }];
    const text = `${categories.length} categories, ${total} rows: leading ${total - rest} + Other ${rest} = ${total - rest + rest}`;
    if (readout) readout.textContent = text;
    else stage.say(text);
    return {
      definition: defineChart({
        marks: [barX(rows, { x: 'count', y: 'name', key: 'name', fill: (d) => (d.other ? '#94a3b8' : '#60a5fa') })],
        scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: () => scaleBand<string>().padding(0.2) } },
        tooltip,
      }),
      height: stage.height,
      initialWidth: 560,
      ariaLabel: 'Leading categories and Other',
    };
  };
  const host = stage.own(mountChart(stage.box, options(8)));
  if (stage.bar) slider(stage.bar, 'leading categories', 3, 20, 1, 8, (v) => host.update(options(v)));
  else {
    stage.cycle([4, 8, 14], 1800, (v) => host.update(options(v)));
    stage.ghost((t) => [0.5, 0.1 + 0.8 * t]);
  }
  return () => stage.dispose();
};

export default mount;

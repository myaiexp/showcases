// A responsive child: its builder gets the width and height of the frame it was allocated
import { barY, defineChart, mountChart, text } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, grid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const totals = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({ q, total: quarters.filter((r) => r.quarter === q).reduce((s, r) => s + r.revenue, 0) }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (leftWidth: number) => {
    const left = defineChart({
      marks: [barY(totals, { x: 'q', y: 'total', fill: '#64748b' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
      margin: 24,
    });
    const right = defineChart(({ width, height }) => ({
      marks: [
        barY(totals, { x: 'q', y: 'total', fill: '#fbbf24' }),
        text([{ q: 'Q1', total: 100, label: `${Math.round(width)} x ${Math.round(height)} px` }], { x: 'q', y: 'total', text: 'label', fill: 'currentColor', anchor: 'start' }),
      ],
      scales: { x: { scale: () => scaleBand<string>().padding(width < 320 ? 0.4 : 0.15) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
      margin: 24,
    }));
    return composeViews({
      views: { left, right },
      layout: grid({
        rows: [{ id: 'r', grow: 1 }],
        columns: [{ id: 'a', size: leftWidth }, { id: 'b', grow: 1 }],
        gap: 8,
        cells: { left: { row: 'r', column: 'a' }, right: { row: 'r', column: 'b' } },
      }),
    });
  };
  const options = (w: number) => ({ definition: build(w), height: stage.height, ariaLabel: 'A fixed view beside a responsive view' });
  const host = stage.own(mountChart(stage.box, options(300)));
  const show = (w: number): void => {
    host.update(options(w));
    stage.say(`left track ${w}px; the right view's builder sees the rest`);
  };
  show(300);
  if (stage.bar) slider(stage.bar, 'left track', 100, 700, 10, 300, show, (v) => `${v}px`);
  else stage.cycle([300, 600, 150], 2000, show);
  return () => stage.dispose();
};

export default mount;

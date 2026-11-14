// Mark states: point.state.hover and point.state.selected, driven by setHovered and setSelected
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { classScores, seeded } from '../../shared/concepts-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const data = classScores(seeded(4));
  let hoverFill = 'red';
  let selectedSize = 14;
  const spec = (): ISpec => ({
    type: 'line',
    data: [{ id: 'lineData', values: data }],
    seriesField: 'class',
    xField: 'date',
    yField: 'score',
    point: {
      style: { fill: 'blue', size: 8 },
      state: {
        hover: { style: { fill: hoverFill, size: 12 } },
        selected: { style: { size: selectedSize } },
      },
    },
  });
  const { vchart, release } = createChart(el, ctx, spec());
  let alive = true;

  // Hover one point, then select it, then move on: the same two states a pointer would set.
  let i = 0;
  const step = (): void => {
    if (!alive) return;
    const d = data[i % data.length];
    if (i % 2 === 0) {
      vchart.setSelected(null);
      vchart.setHovered(d ?? null);
    } else {
      vchart.setHovered(null);
      vchart.setSelected(d ?? null);
    }
    i++;
  };
  const stop = bar ? (): void => {} : every(900, step);
  if (bar) {
    select(bar, 'hover fill', ['red', 'orange', 'lime'], (v) => {
      hoverFill = v;
      void vchart.updateSpec(spec());
    });
    slider(bar, 'selected size', [8, 24, 1], selectedSize, (v) => {
      selectedSize = v;
      void vchart.updateSpec(spec());
    });
    button(bar, 'setSelected Monday class No.1', () => vchart.setSelected(data[0] ?? null));
    button(bar, 'Clear', () => {
      vchart.clearHovered();
      vchart.clearSelected();
    });
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

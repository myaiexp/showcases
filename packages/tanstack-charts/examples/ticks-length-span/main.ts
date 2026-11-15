// tick length, span and inset: fixed pixels, category-step units, or trimmed ends
import { defineChart, mountChart, tickY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const medians = [
  { team: 'Red', median: 42 },
  { team: 'Blue', median: 57 },
  { team: 'Green', median: 35 },
  { team: 'Gold', median: 64 },
  { team: 'Violet', median: 50 },
];
type Mode = 'length' | 'span';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { mode: 'span' as Mode, length: 40, span: 0.6, inset: 0 };

  const build = () =>
    defineChart({
      marks: [
        tickY(medians, {
          x: 'team',
          y: 'median',
          stroke: '#fbbf24',
          strokeWidth: 3,
          inset: v.inset,
          // length and span are mutually exclusive.
          ...(v.mode === 'span' ? { span: v.span } : { length: v.length }),
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.3) },
        y: { scale: scaleLinear().domain([0, 80]), grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Median ticks per team' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(v.mode === 'span' ? `span ${v.span.toFixed(2)} of a category step, inset ${v.inset}px` : `length ${v.length}px, inset ${v.inset}px`);
  };
  refresh();
  if (stage.bar) {
    select(stage.bar, 'size by', [['span', 'span (category steps)'], ['length', 'length (pixels)']] as const, (m) => { v.mode = m; refresh(); }, 'span');
    slider(stage.bar, 'span', 0.1, 1.2, 0.05, v.span, (x) => { v.span = x; refresh(); }, (x) => x.toFixed(2));
    slider(stage.bar, 'length', 4, 120, 2, v.length, (x) => { v.length = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'inset', 0, 20, 1, v.inset, (x) => { v.inset = x; refresh(); }, (x) => `${x}px`);
  } else {
    stage.cycle([[ 'span', 0.4, 0], ['span', 1, 0], ['span', 0.8, 10], ['length', 30, 0]] as const, 1600, ([m, s, i]) => {
      v.mode = m;
      if (m === 'span') v.span = s; else v.length = s;
      v.inset = i;
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;

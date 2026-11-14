// animationThreshold: the data size above which the chart's animation is skipped
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { rng } from '../../shared/components-data.ts';

interface S {
  count: number;
  threshold: number;
}

const rows = (count: number): { i: string; v: number }[] => {
  const r = rng(count * 31 + 7);
  return Array.from({ length: count }, (_, k) => ({ i: String(k + 1), v: Math.round(20 + r() * 70) }));
};

const mount: Mount = (el, ctx) =>
  mountReplay<S>(el, ctx, {
    initial: { count: 12, threshold: 20 },
    period: 3000,
    // The card alternates between a threshold above the data size (animated) and below it (instant).
    step: (s) => ({ threshold: s.threshold === 20 ? 5 : 20 }),
    build: ({ count, threshold }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: rows(count) }],
        xField: 'i',
        yField: 'v',
        legends: { visible: false },
        // The one option of this example: more rows than this and every animation is dropped.
        animationThreshold: threshold,
        animationAppear: { duration: 1400, easing: 'cubicOut' },
        axes: [{ orient: 'left', type: 'linear', max: 100 }, { orient: 'bottom', type: 'band', label: { visible: !preview } }],
        title: {
          visible: true,
          text: `${count} bars, animationThreshold ${threshold}: ${count > threshold ? 'no animation' : 'animated'}`,
          textStyle: { fontSize: preview ? 11 : 13 },
        },
        tooltip: { visible: false },
      }) as unknown as ISpec,
    controls: (bar, set, state) => {
      slider(bar, 'bars', [4, 60, 1], state().count, (v) => set({ count: v }));
      slider(bar, 'animationThreshold', [4, 60, 1], state().threshold, (v) => set({ threshold: v }));
    },
  });

export default mount;

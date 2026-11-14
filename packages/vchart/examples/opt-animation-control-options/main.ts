// controlOptions on a mark animation: immediatelyApply with a delay, stopWhenStateChange with a hover
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountReplay, weekdayRows } from '../../shared/anim-data.ts';

interface S {
  immediatelyApply: boolean;
  stopWhenStateChange: boolean;
}

const mount: Mount = (el, ctx) => {
  let hoverTimer = 0;
  const stopReplay = mountReplay<S>(el, ctx, {
    initial: { immediatelyApply: true, stopWhenStateChange: true },
    period: 4200,
    step: (_s, i) => ({ immediatelyApply: i % 2 === 0, stopWhenStateChange: i % 4 < 2 }),
    build: ({ immediatelyApply, stopWhenStateChange }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'sales', values: weekdayRows(6) }],
        xField: 'day',
        yField: 'sales',
        legends: { visible: false },
        tooltip: { visible: false },
        title: { visible: true, text: `immediatelyApply: ${immediatelyApply}, stopWhenStateChange: ${stopWhenStateChange}`, textStyle: { fontSize: preview ? 10 : 13 } },
        animationAppear: {
          bar: {
            type: 'growHeightIn',
            // The 1.2 s delay is where immediatelyApply matters: do the bars wait at full height or at zero?
            delay: 1200,
            duration: 2000,
            easing: 'linear',
            controlOptions: { immediatelyApply, stopWhenStateChange },
          },
        },
        bar: { state: { hover: { fill: '#ff8a3d' } } },
      }) as unknown as ISpec,
    onChart: (chart) => {
      // Hover a bar while the grow animation is running: with stopWhenStateChange it ends at once.
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => chart.vchart.setHovered({ day: 'Wed' }), 2000);
    },
    controls: (bar, set) => {
      select(bar, 'immediatelyApply', ['true', 'false'], (v) => set({ immediatelyApply: v === 'true' }));
      select(bar, 'stopWhenStateChange', ['true', 'false'], (v) => set({ stopWhenStateChange: v === 'true' }));
    },
  });
  return () => {
    // Stop the hover timer first: mountReplay's cleanup releases the chart it would act on.
    window.clearTimeout(hoverTimer);
    stopReplay();
  };
};

export default mount;

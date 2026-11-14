// Crosshair labels: visible, formatMethod and labelBackground
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { dimensionTour, walk } from '../../shared/components-data.ts';

const data = walk(8, 6);
const LABELS = data.map((d) => d.x);

type Variant = 'none' | 'default' | 'formatted + background';

const build = (variant: Variant): ISpec => {
  const label =
    variant === 'none'
      ? { visible: false }
      : variant === 'default'
        ? { visible: true }
        : {
            visible: true,
            formatMethod: (text: string | number | (string | number)[]) => `day ${String(text).replace('D', '')}`,
            style: { fill: '#0f172a', fontWeight: 'bold' as const },
            labelBackground: { visible: true, padding: 4, style: { fill: '#fde047', cornerRadius: 4 } },
          };
  return {
    type: 'bar',
    data: [{ id: 'bars', values: data }],
    xField: 'x',
    yField: 'y',
    bar: { style: { fill: '#34d399' } },
    crosshair: {
      xField: { visible: true, line: { type: 'rect', style: { fill: '#ffffff', fillOpacity: 0.1 } }, label },
      yField: {
        visible: true,
        line: { type: 'line', style: { stroke: '#fde047', lineDash: [3, 3] } },
        label: variant === 'formatted + background' ? { visible: true, formatMethod: (t: string | number | (string | number)[]) => `${Number(t).toFixed(0)} units` } : label,
      },
    },
  };
};

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('formatted + background'));
  let released = false;

  let stopTour = (): void => {};
  if (ctx.preview) {
    stopTour = dimensionTour(vchart, LABELS, 800, { tooltip: false });
  } else {
    const bar = controlBar(el);
    select(bar, 'label', ['formatted + background', 'default', 'none'], (v) => {
      if (!released) void vchart.updateSpec(build(v as Variant));
    });
    el.prepend(bar);
  }

  return () => {
    stopTour();
    released = true;
    release();
  };
};

export default mount;

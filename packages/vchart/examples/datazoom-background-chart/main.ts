// DataZoom thumbnail: backgroundChart and selectedBackgroundChart (area and line), showBackgroundChart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { groupedRows, slideWindow } from '../../shared/components-data.ts';

const days = Array.from({ length: 36 }, (_, i) => `D${String(i + 1).padStart(2, '0')}`);
const data = groupedRows(days, ['North', 'South'], 52);

const build = (show: boolean, filled: boolean): ISpec => ({
  type: 'line',
  data: [{ id: 'line', values: data }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top' },
  axes: [{ orient: 'left' }, { orient: 'bottom', label: { autoHide: true } }],
  dataZoom: [
    {
      orient: 'bottom',
      start: 0.1,
      end: 0.4,
      height: 50,
      // The preview chart drawn inside the slider: line and area, plain and for the selected part.
      showBackgroundChart: show,
      backgroundChart: {
        area: { style: { visible: filled, fill: '#475569', fillOpacity: 0.5 } },
        line: { style: { stroke: '#94a3b8', lineWidth: 1 } },
      },
      selectedBackgroundChart: {
        area: { style: { visible: filled, fill: '#fbbf24', fillOpacity: 0.55 } },
        line: { style: { stroke: '#fbbf24', lineWidth: 1 } },
      },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(true, true));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    stop = slideWindow(vchart, 'dataZoom', 0.3, 90);
  } else {
    let show = true;
    let filled = true;
    const bar = controlBar(el);
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(show, filled));
    };
    select(bar, 'showBackgroundChart', ['true', 'false'], (v) => ((show = v === 'true'), apply()));
    select(bar, 'area fill', ['visible', 'hidden'], (v) => ((filled = v === 'visible'), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

// DataZoom parts: start / end handlers, middleHandler, startText / endText and showDetail
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { slideWindow, walk } from '../../shared/components-data.ts';

const data = walk(30, 44);

const build = (detail: boolean | 'auto', middle: boolean, handler: string): ISpec => ({
  type: 'area',
  data: [{ id: 'area', values: data }],
  xField: 'x',
  yField: 'y',
  axes: [{ orient: 'left' }, { orient: 'bottom', label: { autoHide: true } }],
  dataZoom: [
    {
      orient: 'bottom',
      start: 0.2,
      end: 0.5,
      showDetail: detail,
      // Text beside the handlers; formatMethod receives the value at that edge.
      startText: { formatMethod: (v) => `from ${v}`, style: { fill: '#fde047' } },
      endText: { formatMethod: (v) => `to ${v}`, style: { fill: '#fde047' } },
      startHandler: { style: { symbolType: handler, fill: '#fde047', size: 16 } },
      endHandler: { style: { symbolType: handler, fill: '#fde047', size: 16 } },
      // The grip in the middle of the selection, hidden by default.
      middleHandler: { visible: middle, background: { size: 8, style: { fill: '#fde047' } }, icon: { style: { fill: '#0f172a', stroke: '#0f172a' } } },
      selectedBackground: { style: { fill: '#fde047', fillOpacity: 0.12 } },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(true, true, 'circle'));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    stop = slideWindow(vchart, 'dataZoom', 0.3, 90);
  } else {
    let detail: boolean | 'auto' = true;
    let middle = true;
    let handler = 'circle';
    const bar = controlBar(el);
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(detail, middle, handler));
    };
    select(bar, 'showDetail', ['true', 'false', 'auto'], (v) => ((detail = v === 'auto' ? 'auto' : v === 'true'), apply()));
    select(bar, 'middleHandler', ['visible', 'hidden'], (v) => ((middle = v === 'visible'), apply()));
    select(bar, 'handler symbol', ['circle', 'diamond', 'square', 'triangle'], (v) => ((handler = v), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

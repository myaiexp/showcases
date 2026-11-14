// FAQ: dataZoom handles drawn from an SVG string, as symbolType
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, select } from '../../shared/chart.ts';
import { slideWindow, walk } from '../../shared/components-data.ts';

// symbolType takes a built-in name, a path string, or a whole <svg> markup string.
// One <path> per icon, as in the FAQ; the pause bars are cut out of the disc with the opposite winding.
const PAUSE =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1 A11 11 0 1 1 11.99 1 Z M7.5 6.5 V17.5 H10.5 V6.5 Z M13.5 6.5 V17.5 H16.5 V6.5 Z" fill="#facc15"></path></svg>';
const FLAG =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 2 H7 V22 H5 Z M7 3 H20 L16 8 L20 13 H7 Z" fill="#38bdf8"></path></svg>';
const SYMBOLS: Record<string, string> = { 'svg: pause badge': PAUSE, 'svg: flag': FLAG, 'path string': 'M -1 -1 L 1 0 L -1 1 Z', 'built-in rect': 'rect' };

const build = (symbol: string): ISpec => ({
  type: 'area',
  data: [{ id: 'd', values: walk(40, 8) }],
  xField: 'x',
  yField: 'y',
  axes: [{ orient: 'left' }, { orient: 'bottom', label: { autoHide: true } }],
  dataZoom: [
    {
      orient: 'bottom',
      start: 0.2,
      end: 0.5,
      startHandler: { style: { symbolType: SYMBOLS[symbol] ?? 'rect', size: 22 } },
      endHandler: { style: { symbolType: SYMBOLS[symbol] ?? 'rect', size: 22 } },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('svg: pause badge'));
  let released = false;
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'handle symbolType', Object.keys(SYMBOLS), (v) => {
      if (!released) void vchart.updateSpec(build(v));
    });
  }
  const stop = slideWindow(vchart, 'dataZoom', 0.3, 90);
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

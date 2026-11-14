// FAQ: break a markLine label over several lines by giving label.text an array
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const MODES = ['one string', 'array of lines'] as const;

const build = (mode: string): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: walk(12, 21) }],
  xField: 'x',
  yField: 'y',
  axes: [{ orient: 'left', min: 0, max: 100 }, { orient: 'bottom' }],
  markLine: [
    {
      y: 80,
      endSymbol: { visible: false },
      line: { style: { stroke: '#f97316', lineDash: [6, 4] } },
      label: {
        visible: true,
        position: 'insideEndTop',
        // Each array element is its own line of text.
        text: mode === 'one string' ? 'Safe sugar intake 50g/day' : ['Safe sugar intake', '50g/day'],
        labelBackground: { visible: false },
        style: { fill: '#fdba74', fontSize: 13 },
      },
    },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(MODES[1]));
  let released = false;
  const apply = (v: string): void => {
    if (!released) void vchart.updateSpec(build(v));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'label.text', MODES, apply).value = MODES[1];
  }
  let i = 0;
  const stop = every(1800, () => {
    i += 1;
    if (ctx.preview) apply(pick(MODES, i + 1));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

// pictorialBar layout: symbolPosition anchors the symbol in its reference bar, symbolOffset and symbolRotate nudge it
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E'];
const values = [60, 85, 40, 95, 70];
const POSITIONS = ['start', 'center', 'end'] as const;
const OFFSETS: Record<string, [number | string, number | string]> = {
  '[0, 0]': [0, 0],
  '[0, -10]': [0, -10],
  "[0, '-50%']": [0, '-50%'],
  "['50%', 0]": ['50%', 0],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let position: (typeof POSITIONS)[number] = 'end';
  let offsetKey = '[0, 0]';
  let rotate = 0;

  const apply = (): void => {
    chart.setOption(
      {
        title: ctx.preview ? { text: `symbolPosition: '${position}'  symbolOffset: ${offsetKey}`, left: 'center', top: 0, textStyle: { fontSize: 12, fontWeight: 'normal' } } : undefined,
        grid: { top: 36, left: 36, right: 16, bottom: 28 },
        xAxis: { type: 'category', data: cats },
        yAxis: { type: 'value', max: 110 },
        series: [
          // A plain bar series draws the reference bar the symbols are laid out against.
          { type: 'bar', data: values, barWidth: '50%', itemStyle: { color: 'rgba(150,150,150,0.25)' }, z: 1, silent: true },
          {
            type: 'pictorialBar',
            data: values,
            symbol: 'triangle',
            symbolSize: ['50%', 22],
            // symbolPosition: where in the reference bar the symbol sits: its start, centre or end.
            symbolPosition: position,
            // symbolOffset: the final shift, in pixels or as a percentage of the symbol's own size.
            symbolOffset: OFFSETS[offsetKey],
            // symbolRotate: rotation about the symbol's centre; it does not move the symbol.
            symbolRotate: rotate,
            itemStyle: { color: '#fac858' },
            z: 2,
            barGap: '-100%',
          },
        ],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'symbolPosition', POSITIONS, (v) => {
      position = v as typeof position;
      apply();
    }).value = position;
    select(bar, 'symbolOffset', Object.keys(OFFSETS), (v) => {
      offsetKey = v;
      apply();
    });
    select(bar, 'symbolRotate', ['0', '45', '90', '180'], (v) => {
      rotate = Number(v);
      apply();
    });
  } else {
    const keys = Object.keys(OFFSETS);
    let i = 0;
    stop = every(1400, () => {
      i++;
      position = POSITIONS[i % POSITIONS.length]!;
      offsetKey = keys[Math.floor(i / 3) % keys.length]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;

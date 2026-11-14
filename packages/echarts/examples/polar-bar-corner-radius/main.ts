// Polar bars with sector borderRadius: one radius, an inner/outer pair, or four corners from the inside out
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

type Radius = number | string | (number | string)[];
// Each preset is a borderRadius value; the label says how the docs read it.
const PRESETS: Record<string, Radius> = {
  '0': 0,
  '12 (all corners)': 12,
  "'40%' (of ring thickness)": '40%',
  '[4, 18] (inner, outer)': [4, 18],
  '[18, 0, 0, 18] (four corners)': [18, 0, 0, 18],
  '[0, 18, 18, 0]': [0, 18, 18, 0],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const keys = Object.keys(PRESETS);
  let borderRadius: Radius = PRESETS[keys[4]!]!;
  let gap = 0;

  const apply = (): void => {
    chart.setOption({
      legend: { show: !ctx.preview },
      polar: { radius: [34, '78%'] },
      angleAxis: { type: 'category', data: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], startAngle: 112 },
      radiusAxis: { max: 10, axisLabel: { show: false }, splitLine: { show: false } },
      series: [
        { name: 'Morning', values: [3, 4, 2, 5, 3, 2, 4, 3] },
        { name: 'Evening', values: [2, 3, 4, 2, 4, 3, 2, 5] },
      ].map((s) => ({
        name: s.name,
        type: 'bar',
        coordinateSystem: 'polar',
        stack: 'wind',
        data: s.values,
        // borderRadius on a sector: a number, a percentage of the ring thickness, or up to four
        // radii (inner start, inner end, outer start, outer end) going clockwise from the inside.
        itemStyle: { borderRadius, borderColor: '#1b1b1f', borderWidth: gap },
      })),
    });
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'borderRadius', keys, (k) => {
      borderRadius = PRESETS[k]!;
      apply();
    }).value = keys[4]!;
    select(bar, 'borderWidth', ['0', '2', '4'], (v) => {
      gap = Number(v);
      apply();
    });
  } else {
    let i = 0;
    stop = every(1700, () => {
      borderRadius = PRESETS[keys[++i % keys.length]!]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;

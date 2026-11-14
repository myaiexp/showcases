// Polar bar labels: the radial positions start, insideStart, middle, insideEnd and end, plus rotate
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const names = ['Sleep', 'Work', 'Commute', 'Meals', 'Leisure'];
const hours = [7, 8, 1.5, 2, 5.5];
const POSITIONS = ['start', 'insideStart', 'middle', 'insideEnd', 'end'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let position: (typeof POSITIONS)[number] = 'insideStart';
  let rotate: 'radial' | 'tangential' | 0 = 'radial';

  const apply = (): void => {
    chart.setOption(
      {
        polar: { radius: [30, '80%'], center: ['50%', '50%'] },
        // A category radius axis gives one ring per name; the angle axis is the value (0 to 12 hours).
        radiusAxis: { type: 'category', data: names, z: 10, axisLabel: { show: false } },
        angleAxis: { max: 12, startAngle: 90, splitLine: { show: false } },
        series: {
          type: 'bar',
          coordinateSystem: 'polar',
          data: hours,
          colorBy: 'data',
          roundCap: true,
          label: {
            show: true,
            // On polar bars, label.position also accepts start / insideStart / middle / insideEnd / end.
            position,
            // rotate: 'radial' follows the radius, 'tangential' follows the arc, or a number of degrees.
            rotate,
            formatter: '{b}: {c}h',
            fontSize: 12,
          },
        },
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'label.position', POSITIONS, (v) => {
      position = v as typeof position;
      apply();
    }).value = position;
    select(bar, 'label.rotate', ['radial', 'tangential', 'number'], (v) => {
      rotate = v === 'number' ? 0 : (v as 'radial' | 'tangential');
      apply();
    });
  } else {
    let i = 0;
    stop = every(1500, () => {
      position = POSITIONS[++i % POSITIONS.length] ?? 'middle';
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;

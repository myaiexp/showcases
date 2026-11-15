// Focus guide label options: side, offset, background, color and font, with a control for the side
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { focusGuideX } from '@tanstack/charts/focus/guide';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line, then switch the side of the x label.' });

  const build = (side: 'start' | 'end') =>
    defineChart({
      marks: [
        lineY(sensorA, { id: 'sensor', x: 'month', y: 'value', key: 'id', points: true }),
        focusGuideX(sensorA, {
          id: 'cursor',
          x: 'month',
          y: 'value',
          key: 'id',
          marker: { radius: 5, fill: '#fbbf24', stroke: '#111', strokeWidth: 1.5 },
          xLabel: {
            side,
            offset: 6,
            paddingX: 8,
            paddingY: 3,
            radius: 6,
            background: '#fbbf24',
            color: '#111',
            fontSize: 12,
            fontWeight: 700,
            format: (month) => months[month] ?? String(month),
          },
        }),
      ],
      scales: {
        x: { scale: scaleLinear },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = (side: 'start' | 'end') => ({ definition: build(side), height: stage.height, ariaLabel: 'Sensor readings with a styled focus label' });
  const host = stage.own(mountChart(stage.box, options('end')));
  if (stage.bar) {
    select(stage.bar, 'x label side', [['end', 'end (bottom)'], ['start', 'start (top)']] as const, (side) => host.update(options(side)));
  } else {
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;

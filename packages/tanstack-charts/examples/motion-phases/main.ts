// A motion callback that answers differently for the enter, update and exit phases
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const frames = [[0, 1, 2, 3], [0, 1, 2, 3, 4, 5], [1, 2, 4, 5], [0, 2, 3, 5]] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Months come and go, and the others change value: enter, update and exit all show.' });
  let frame = 0;
  const options = () => {
    const rows = frames[frame % frames.length]!.map((i) => ({ ...revenue[i]!, revenue: Math.round(revenue[i]!.revenue * (1 + ((frame + i) % 3) * 0.15)) }));
    return {
      definition: defineChart({
        marks: [
          barY(rows, {
            x: 'month',
            y: 'revenue',
            key: 'id',
            fill: '#fb7185',
            motion(context) {
              if (context.phase === 'enter') return { delay: context.datumIndex * 40, transition: { type: 'tween', duration: 500, easing: 'ease-out' } };
              if (context.phase === 'exit') return { transition: { type: 'tween', duration: 200, easing: 'ease-in' } };
              return { transition: { type: 'spring', stiffness: 200, damping: 16 } };
            },
          }),
        ],
        scales: {
          x: { scale: scaleBand<string>().domain(revenue.map((r) => r.month)).padding(0.2) },
          y: { scale: scaleLinear().domain([0, 100_000]), grid: true },
        },
      }),
      renderer: motion(),
      height: stage.height,
      ariaLabel: 'Monthly revenue with changing months',
    };
  };
  const host = stage.own(mountChartRenderer(stage.box, options()));
  stage.every(2000, () => {
    frame++;
    host.update(options());
  });
  return () => stage.dispose();
};

export default mount;

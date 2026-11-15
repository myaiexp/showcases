// rank order: rank 1 for the highest value or for the lowest
import { barX, defineChart, rank, text } from '@tanstack/charts';
import type { TransformOrder } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const lap = [
  { driver: 'Vera', seconds: 81.2 },
  { driver: 'Nils', seconds: 79.8 },
  { driver: 'Ines', seconds: 83.5 },
  { driver: 'Omar', seconds: 80.4 },
  { driver: 'Kai', seconds: 82.1 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (order: TransformOrder) => {
    const rows = rank(lap, { value: 'seconds', order, as: 'place' });
    return defineChart({
      marks: [
        barX(rows, { x: 'seconds', y: 'driver', fill: '#64748b' }),
        text(rows, { x: 'seconds', y: 'driver', text: (r) => `place ${r.place}`, dx: -30, fill: '#fbbf24' }),
      ],
      scales: { x: { scale: scaleLinear().domain([0, 90]), grid: true, axis: { label: 'Lap time (s)' } }, y: { scale: () => scaleBand<string>().padding(0.2) } },
    });
  };
  const states = [['ascending', "order: 'ascending' (fastest is place 1)"], ['descending', "order: 'descending' (slowest is place 1)"]] as const;
  lab(stage, { label: 'order', ariaLabel: 'Lap times with places', states, build, ms: 2400, after: (_, name) => stage.say(`${name}, output named with as: 'place'`) });
  return () => stage.dispose();
};

export default mount;

// fold: wide rows (one column per period) become long rows with a key and a value
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const wide = [
  { city: 'Oslo', R90_10_1980: 3.1, R90_10_2015: 3.9 },
  { city: 'Lyon', R90_10_1980: 4.4, R90_10_2015: 4.2 },
  { city: 'Porto', R90_10_1980: 5.2, R90_10_2015: 6.4 },
  { city: 'Turin', R90_10_1980: 4.0, R90_10_2015: 5.5 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: each row kept its city and gained periodField and inequality.' });

  const points = fold(wide, {
    fields: ['R90_10_1980', 'R90_10_2015'] as const,
    as: { key: 'periodField', value: 'inequality' },
  });

  const definition = defineChart({
    marks: [
      lineY(points, { x: 'periodField', y: 'inequality', color: 'city', strokeWidth: 2 }),
      dot(points, { x: 'periodField', y: 'inequality', color: 'city', r: 4 }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.4) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: '90/10 ratio' } },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Inequality by city, 1980 and 2015' }));
  readoutPanel(stage)(`${wide.length} wide rows -> ${points.length} long rows\n${tableText(points, ['city', 'periodField', 'inequality', 'sourceIndexes'])}`);
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

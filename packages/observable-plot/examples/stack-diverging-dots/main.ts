// Diverging stacked dots of Congress by age, placed with stackY2
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const congress = await csv('us-congress-2023.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      aspectRatio: preview ? undefined : 1,
      x: { label: 'Age (years)' },
      y: { grid: true, label: '← Women · Men →', labelAnchor: 'center', tickFormat: Math.abs },
      marks: [
        Plot.dot(
          congress,
          Plot.stackY2({
            x: (d: Row) => 2023 - d.birthday.getUTCFullYear(),
            y: (d: Row) => (d.gender === 'M' ? 1 : -1),
            fill: 'gender',
            title: 'full_name',
          }),
        ),
        Plot.ruleY([0]),
      ],
    }),
  );
};

export default mount;

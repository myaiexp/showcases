// bandX inside whenFocused: a background column that follows the focused category
import { bandX, barY, defineChart, mountChart, whenFocused } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({ day, visits: [30, 44, 38, 52, 47, 25, 19][i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the band behind it lights up.' });

  const definition = defineChart({
    marks: [
      whenFocused(bandX(rows, { x: 'day', fill: '#64748b', fillOpacity: 0.2, inset: -6, radius: 6 }), { match: 'x' }),
      barY(rows, { x: 'day', y: 'visits' }),
    ],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.3) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Visits by weekday' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

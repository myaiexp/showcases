// waffleY: a ten-by-ten grid where one cell is one percentage point
import { colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { tooltip } from '@tanstack/charts/tooltip';
import { waffleY } from '@tanstack/charts/waffle';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const energy = [
  { source: 'Wind', share: 34 },
  { source: 'Hydro', share: 27 },
  { source: 'Nuclear', share: 21 },
  { source: 'Solar', share: 11 },
  { source: 'Gas', share: 7 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cell: it reports the whole row it belongs to.' });

  const definition = defineChart({
    marks: [waffleY(energy, { y: 'share', color: 'source', unit: 1, columns: 10, gap: 2, radius: 2 })],
    scales: { x: null, y: null },
    color: { legend: colorLegend() },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Electricity by source as a waffle chart' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

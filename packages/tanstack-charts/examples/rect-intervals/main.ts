// rect: x interval per task on a band-scale lane, coloured by status
import { colorLegend, defineChart, mountChart, rect } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const tasks = [
  { lane: 'Design', name: 'Wireframes', start: 0, end: 6, status: 'done' },
  { lane: 'Design', name: 'Visual pass', start: 6, end: 13, status: 'done' },
  { lane: 'Build', name: 'API', start: 4, end: 15, status: 'active' },
  { lane: 'Build', name: 'Interface', start: 12, end: 24, status: 'active' },
  { lane: 'Test', name: 'Load test', start: 20, end: 27, status: 'planned' },
  { lane: 'Test', name: 'Review', start: 26, end: 31, status: 'planned' },
  { lane: 'Launch', name: 'Go live', start: 30, end: 34, status: 'planned' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a task for its dates.' });

  const definition = defineChart({
    marks: [rect(tasks, { x1: 'start', x2: 'end', y: 'lane', z: 'status', inset: 3, radius: 4 })],
    scales: {
      x: { scale: scaleLinear, grid: true, axis: { label: 'Day' } },
      y: { scale: () => scaleBand<string>().padding(0.15) },
    },
    color: { legend: colorLegend() },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Project tasks as horizontal intervals' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

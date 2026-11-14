// ridgelineY: normalised histogram profiles stacked on a reversed point scale
import { defineChart, mountChart, ridgelineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { seasonProfiles, seasons } from '../../shared/marks1-seasons.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a profile: a sample reports its bin centre and height.' });

  const definition = defineChart({
    marks: [ridgelineY(seasonProfiles, { x: 'position', y: 'group', height: 'height', overlap: 0.9, color: 'group', fillOpacity: 0.6 })],
    scales: {
      x: { scale: scaleLinear().domain([0, 10]), grid: true, axis: { label: 'Rating' } },
      y: { scale: scalePoint<string>().domain(seasons).padding(0.9), reverse: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Rating distributions by season as a ridgeline' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

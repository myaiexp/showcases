// ridgelineX: vertical profiles extending right of categorical x baselines
import { defineChart, mountChart, ridgelineX } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { boundaries, profilesY } from '../../shared/marks1-profiles.ts';
import { createStage } from '../../shared/stage.ts';

const groups = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const rows = groupedObservations({ Mon: [12, 3, 100], Tue: [15, 3, 100], Wed: [18, 4, 100], Thu: [16, 3, 100], Fri: [11, 4, 100] }, 33);
const profiles = profilesY(rows, boundaries(0, 30, 1.5));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [ridgelineX(profiles, { x: 'group', y: 'position', height: 'height', overlap: 0.8, color: 'group', fillOpacity: 0.6 })],
    scales: {
      x: { scale: scalePoint<string>().domain(groups).padding(0.8) },
      y: { scale: scaleLinear().domain([0, 30]), grid: true, axis: { label: 'Minutes' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Commute time by weekday as vertical ridges' }));
  return () => stage.dispose();
};

export default mount;

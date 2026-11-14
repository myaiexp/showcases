// violinX: horizontal mirrored profiles around categorical y centres
import { curveBasis } from 'd3-shape';
import { defineChart, mountChart, violinX } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { boundaries, profiles } from '../../shared/marks1-profiles.ts';
import { createStage } from '../../shared/stage.ts';

const groups = ['Cache hit', 'Database', 'Third party'];
const rows = groupedObservations({ 'Cache hit': [12, 4, 200], Database: [60, 18, 200], 'Third party': [140, 45, 200] }, 15);
const data = profiles(rows, boundaries(0, 260, 10));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a profile sample.' });

  const definition = defineChart({
    marks: [violinX(data, { x: 'position', y: 'group', width: 'height', span: 0.8, color: 'group', fillOpacity: 0.5, curve: d3Curve(curveBasis) })],
    scales: {
      x: { scale: scaleLinear().domain([0, 260]), grid: true, axis: { label: 'Response time (ms)' } },
      y: { scale: scalePoint<string>().domain(groups).padding(0.5) },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Response times as horizontal violins' }));
  return () => stage.dispose();
};

export default mount;

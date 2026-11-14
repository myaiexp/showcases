// violinY over binY profiles, with a median dot per group from groupBy
import { curveBasis } from 'd3-shape';
import { defineChart, dot, groupBy, mountChart, violinY } from '@tanstack/charts';
import { d3AreaXCurve } from '@tanstack/charts/d3/area-x';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { median } from '@tanstack/charts/transform/reduce';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { boundaries, profilesY } from '../../shared/marks1-profiles.ts';
import { createStage } from '../../shared/stage.ts';

const groups = ['Adelie', 'Chinstrap', 'Gentoo'];
const rows = groupedObservations({ Adelie: [3700, 450, 150], Chinstrap: [3730, 380, 70], Gentoo: [5075, 500, 120] }, 21);
const profiles = profilesY(rows, boundaries(2500, 6500, 200));
const medians = groupBy(rows, { by: 'group', outputs: { median: { value: 'value', reduce: median } } });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a profile sample or a median dot.' });

  const definition = defineChart({
    marks: [
      violinY(profiles, { x: 'group', y: 'position', width: 'height', span: 0.76, color: 'group', fillOpacity: 0.5, curve: d3AreaXCurve(curveBasis) }),
      dot(medians, { x: 'group', y: 'median', r: 4, fill: '#fff', stroke: '#111' }),
    ],
    scales: {
      x: { scale: scalePoint<string>().domain(groups).padding(0.5) },
      y: { scale: scaleLinear().domain([2500, 6500]), grid: true, axis: { label: 'Body mass (g)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Body mass by species as violins' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

// areaY layout: stack({ order: 'inside-out', offset: 'wiggle' }) over five bump series
import { curveBasis } from 'd3-shape';
import { areaY, defineChart, mountChart, stack } from '@tanstack/charts';
import { d3Curve } from '@tanstack/charts/d3/shape';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(9);
const rows = ['Rock', 'Jazz', 'Folk', 'Pop', 'Soul'].flatMap((genre) => {
  const peak = 4 + random() * 22;
  const width = 3 + random() * 4;
  const height = 8 + random() * 14;
  return Array.from({ length: 30 }, (_, week) => ({
    week,
    genre,
    plays: Math.round(2 + height * Math.exp(-(((week - peak) / width) ** 2)) + random() * 2),
  }));
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a layer to read its plays for the week.' });

  const definition = defineChart({
    marks: [
      areaY(rows, {
        x: 'week',
        y: 'plays',
        z: 'genre',
        fillOpacity: 0.85,
        curve: d3Curve(curveBasis),
        layout: stack({ order: 'inside-out', offset: 'wiggle' }),
      }),
    ],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'Week' } },
      y: { scale: scaleLinear, axis: false },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Streamgraph of plays by genre' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

// differenceY line options: primary and comparison strokes, dashes, points
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceY } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { forecastVsActual } from '../../shared/marks1-compare.ts';
import { createStage } from '../../shared/stage.ts';

const rows = forecastVsActual(16);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (points: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        differenceY(rows, {
          x: 'day',
          y1: 'forecast',
          y2: 'actual',
          stroke: '#f59e0b',
          strokeWidth: 3,
          comparisonStroke: '#94a3b8',
          comparisonStrokeWidth: 2,
          comparisonStrokeDasharray: '6 4',
          positiveFillOpacity: 0.35,
          negativeFillOpacity: 0.1,
          points,
        }),
      ],
      scales: {
        x: { scale: scaleLinear },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(false), height: stage.height, initialWidth: 640, ariaLabel: 'Difference with styled lines' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (on: boolean): void => host.update({ ...options, definition: chart(on) });

  if (stage.bar) checkbox(stage.bar, 'points', false, show);
  else stage.cycle([false, true], 2500, show);
  return () => stage.dispose();
};

export default mount;

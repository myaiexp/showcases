// linearRegressionY with a Date independent channel
import { defineChart, lineY, linearRegressionY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { days, normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const noise = normal(rng(8), 0, 2.5);
const rows = days('2025-01-01', 90).map((date, i) => ({ date, level: Math.round((20 + i * 0.12 + noise()) * 10) / 10 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = defineChart({
    marks: [
      lineY(rows, { x: 'date', y: 'level', strokeWidth: 1, strokeOpacity: 0.6 }),
      linearRegressionY(rows, { x: 'date', y: 'level', stroke: '#f59e0b', strokeWidth: 2.5 }),
    ],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Level' } },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Readings with a fitted trend' }));
  return () => stage.dispose();
};

export default mount;

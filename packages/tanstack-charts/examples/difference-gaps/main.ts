// differenceY: an invalid row breaks both areas and both lines
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceY } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { forecastVsActual } from '../../shared/marks1-compare.ts';
import { createStage } from '../../shared/stage.ts';

interface Row {
  day: number;
  forecast: number;
  actual: number | null;
}

const complete: Row[] = forecastVsActual(24);
const holes = new Set([8, 9, 17]);
const withGaps: Row[] = complete.map((r) => (holes.has(r.day) ? { ...r, actual: null } : r));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (rows: Row[]) =>
    defineChart({
      svgAnimation: true,
      marks: [differenceY(rows, { x: 'day', y1: 'forecast', y2: 'actual', fillOpacity: 0.3, points: true })],
      scales: {
        x: { scale: scaleLinear },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(withGaps), height: stage.height, initialWidth: 640, ariaLabel: 'Difference with missing days' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (filled: boolean): void => host.update({ ...options, definition: chart(filled ? complete : withGaps) });

  if (stage.bar) checkbox(stage.bar, 'fill the missing days', false, show);
  else stage.cycle([false, true], 2500, show);
  return () => stage.dispose();
};

export default mount;

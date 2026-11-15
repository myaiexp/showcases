// hexagon at binXY cell centres: r and colour both carry the cell count
import { scaleLinear as d3Linear, scaleSqrt } from 'd3-scale';
import { binXY, defineChart, hexagon, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { readings } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = readings(80);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a hexagon for the count in that cell.' });

  const chart = (cells: number) => {
    const bins = binXY(rows, { x: 'length', y: 'depth', xThresholds: cells, yThresholds: Math.round(cells * 0.7) });
    return defineChart({
      svgAnimation: true,
      marks: [hexagon(bins, { x: 'x', y: 'y', r: 'value', rScale: { scale: () => scaleSqrt().range([2, 13]) }, color: 'value', key: (d) => `${d.x1}:${d.y1}`, fillOpacity: 0.85 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Bill length (mm)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Bill depth (mm)' } },
      },
      color: { scale: d3Linear, range: ['#475569', '#38bdf8', '#fde047'] },
      tooltip,
    });
  };

  const options = { definition: chart(12), height: stage.height, initialWidth: 640, ariaLabel: 'Hexagons for the density of bill length and depth' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (n: number): void => host.update({ ...options, definition: chart(n) });

  if (stage.bar) slider(stage.bar, 'cells across', 6, 24, 1, 12, show);
  else {
    stage.cycle([8, 12, 18], 2200, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;

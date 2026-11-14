// areaY and lineY layers sharing channels so the line follows the area's top
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { threeSeries } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = threeSeries(40, 14).filter((r) => r.series === 'North');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (withLine: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        areaY(rows, { x: 'date', y: 'value', fillOpacity: 0.16 }),
        ...(withLine ? [lineY(rows, { x: 'date', y: 'value' })] : []),
      ],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(true), height: stage.height, initialWidth: 640, ariaLabel: 'A series drawn as an area with a line' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (on: boolean): void => host.update({ ...options, definition: chart(on) });

  if (stage.bar) checkbox(stage.bar, 'line layer', true, show);
  else stage.cycle([true, false], 2500, show);
  return () => stage.dispose();
};

export default mount;

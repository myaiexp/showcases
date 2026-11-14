// barX: horizontal bars, length on x, category on y
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { language: 'TypeScript', repos: 480 },
  { language: 'Rust', repos: 310 },
  { language: 'Python', repos: 620 },
  { language: 'Go', repos: 275 },
  { language: 'Zig', repos: 96 },
  { language: 'Elixir', repos: 140 },
];
const sorted = [...rows].sort((a, b) => b.repos - a.repos);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (data: typeof rows) =>
    defineChart({
      svgAnimation: true,
      marks: [barX(data, { x: 'repos', y: 'language', key: 'language' })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Repositories' } },
        y: { scale: () => scaleBand<string>().padding(0.25) },
      },
      tooltip,
    });

  const options = { definition: chart(rows), height: stage.height, initialWidth: 640, ariaLabel: 'Repositories by language' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (on: boolean): void => host.update({ ...options, definition: chart(on ? sorted : rows) });

  if (stage.bar) checkbox(stage.bar, 'sort by value', false, show);
  else {
    stage.cycle([false, true], 2200, show);
    stage.ghost((t) => [0.5, 0.1 + 0.8 * t]);
  }
  return () => stage.dispose();
};

export default mount;

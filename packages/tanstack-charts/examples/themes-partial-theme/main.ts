// A theme with only a palette: omitted fields keep their defaults (currentColor, transparent)
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the theme: only the series colors change, the text color is still the container color.' });
  const latest = downloads.filter((d) => d.week === 'Jun 8');
  const build = (themed: boolean) =>
    defineChart({
      ...(themed ? { theme: { palette: ['#f472b6', '#facc15', '#22d3ee'] } } : {}),
      marks: [barY(latest, { x: 'package', y: 'downloads', color: 'package' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  const options = (themed: boolean) => ({ definition: build(themed), height: stage.height, ariaLabel: 'Downloads by package, latest week' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (on: boolean): void => {
    host.update(options(on));
    stage.say(on ? "theme: { palette: ['#f472b6', ...] }" : 'no theme: the six --ts-chart tokens');
  };
  if (stage.bar) checkbox(stage.bar, 'theme with palette', true, apply);
  else stage.cycle([true, false], 2000, apply);
  return () => stage.dispose();
};

export default mount;

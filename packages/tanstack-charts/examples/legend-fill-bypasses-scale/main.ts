// color goes through the scale and legend; fill is a final override that bypasses both
import { barY, colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const latest = downloads.filter((d) => d.week === 'Jun 8');
const hand: Record<string, string> = { core: '#e11d48', react: '#0ea5e9', octane: '#a3e635' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch to fill: the paint no longer comes from the scale, and no legend is built.' });
  const build = (override: boolean) =>
    defineChart({
      marks: [barY(latest, { x: 'package', y: 'downloads', ...(override ? { fill: (d: { package: string }) => hand[d.package]! } : { color: 'package' }) })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { legend: colorLegend({ label: 'Package' }) },
    });
  const options = (override: boolean) => ({ definition: build(override), height: stage.height, ariaLabel: 'Downloads by package, latest week' });
  const host = stage.own(mountChart(stage.box, options(false)));
  const apply = (v: boolean): void => {
    host.update(options(v));
    stage.say(v ? 'fill: (d) => hand-picked color, no legend' : 'color: "package", legend from the scale');
  };
  if (stage.bar) checkbox(stage.bar, 'fill override', false, apply);
  else stage.cycle([false, true], 2200, apply);
  return () => stage.dispose();
};

export default mount;

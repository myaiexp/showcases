// A configured ordinal scale: filtering the data never reassigns colors
import { colorLegend, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick a package: the others keep their colors.' });
  const shown = new Set<string>(packageNames);
  const build = () =>
    defineChart({
      marks: [lineY(downloads.filter((d) => shown.has(d.package)), { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
      color: {
        scale: scaleOrdinal<string, string>().domain(packageNames).range(packageColors),
        legend: colorLegend({ label: 'Package' }),
      },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Weekly downloads' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (names: readonly string[]): void => {
    shown.clear();
    names.forEach((n) => shown.add(n));
    host.update(options());
    stage.say(`data present: ${names.join(', ')}`);
  };
  if (stage.bar) packageNames.forEach((n) => checkbox(stage.bar!, n, true, (v) => { if (v) shown.add(n); else shown.delete(n); host.update(options()); }));
  else stage.cycle([['core', 'react', 'octane'], ['react', 'octane'], ['octane'], ['core', 'octane']], 1800, set);
  return () => stage.dispose();
};

export default mount;

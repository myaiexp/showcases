// A fixed ordinal scale keeps each region's colour when others are filtered out; the default palette shifts
import { colorLegend, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { regionColors, regionalSeries, regions } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const all = regionalSeries(9, 16);
const regionColor = scaleOrdinal<string, string>([...regions], [...regionColors]);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Untick North: on the left South takes over the first palette colour, on the right nothing changes.' });
  const right = stage.addBox();
  const shown = new Set<string>(regions);

  const build = (fixed: boolean) => {
    const rows = all.filter((row) => shown.has(row.region));
    return defineChart({
      marks: [lineY(rows, { x: 'date', y: 'value', z: 'region' })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      ...(fixed ? { color: { scale: regionColor, legend: colorLegend({ label: 'Region' }) } } : { color: { legend: colorLegend({ label: 'Region' }) } }),
    });
  };

  const base = { height: stage.height };
  const a = stage.own(mountChart(stage.box, { ...base, definition: build(false), ariaLabel: 'Default palette' }));
  const b = stage.own(mountChart(right, { ...base, definition: build(true), ariaLabel: 'Fixed ordinal colours' }));
  const refresh = (): void => {
    a.update({ ...base, definition: build(false), ariaLabel: 'Default palette' });
    b.update({ ...base, definition: build(true), ariaLabel: 'Fixed ordinal colours' });
  };
  const subsets: readonly (readonly string[])[] = [regions, ['South', 'West'], ['West']];
  if (stage.bar) {
    for (const region of regions) {
      checkbox(stage.bar, region, true, (on) => {
        if (on) shown.add(region);
        else shown.delete(region);
        refresh();
      });
    }
    stage.say('Left: default palette. Right: scaleOrdinal with fixed domain and colours.');
  } else {
    stage.cycle(subsets, 1800, (subset) => {
      shown.clear();
      subset.forEach((r) => shown.add(r));
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;

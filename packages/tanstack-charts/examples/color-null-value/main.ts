// A null color channel value: mapped to the first range color on the built-in scale
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const groups = ['alpha', 'beta', 'gamma'] as const;
const rows = Array.from({ length: 30 }, (_, i) => ({ id: `p${i}`, x: (i * 37) % 100, y: (i * 53) % 90 + 5, group: i % 7 === 0 ? null : groups[i % 3]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every seventh row has no group. See where those dots land.' });
  const build = (explicit: boolean) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'group', r: 6 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { domain: groups, range: explicit ? ['#2563eb', '#f97316', '#10b981'] : undefined, legend: colorLegend({ label: 'Group' }) },
    });
  const options = (explicit: boolean) => ({ definition: build(explicit), height: stage.height, ariaLabel: 'Points with some missing groups' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (v: boolean): void => {
    host.update(options(v));
    stage.say(v ? 'range given: nulls take the first range color (blue)' : 'theme palette: nulls take the first palette color');
  };
  if (stage.bar) checkbox(stage.bar, 'explicit range', true, apply);
  else stage.cycle([true, false], 2200, apply);
  return () => stage.dispose();
};

export default mount;

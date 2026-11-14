// Upgrading one axis to D3: scaleTime gives local-time ticks while y stays a compact linear scale
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { scaleTime } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const start = Date.parse('2026-06-01T00:00:00Z');
const values = walk(rng(31), 72, 20, 1.2);
const rows = values.map((value, i) => ({ id: `h${i}`, time: new Date(start + i * 3_600_000), value }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let local = true;

  const build = () =>
    defineChart({
      marks: [lineY(rows, { x: 'time', y: 'value', stroke: '#60a5fa' })],
      scales: {
        x: {
          scale: local ? scaleTime : scaleUtc,
          nice: true,
          axis: { label: local ? 'd3 scaleTime (local midnight ticks)' : 'compact scaleUtc (UTC midnight ticks)' },
        },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Hourly temperature' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    local = v;
    host.update(options());
  };
  if (stage.bar) checkbox(stage.bar, 'local time (d3 scaleTime)', true, set);
  else stage.cycle([true, false], 2200, set);
  return () => stage.dispose();
};

export default mount;

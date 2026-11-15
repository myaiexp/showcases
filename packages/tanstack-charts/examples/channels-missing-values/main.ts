// Missing values: null splits the line and the area; a zero fill would draw a false dip
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { days, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

interface Reading {
  id: string;
  time: Date;
  temperature: number | null;
}

const random = rng(8);
const times = days('2026-03-01', 24);
const readings: Reading[] = times.map((time, i) => ({
  id: `r${i}`,
  time,
  temperature: (i >= 8 && i <= 11) || i === 17 ? null : Math.round((14 + 5 * Math.sin(i / 3) + random() * 2) * 10) / 10,
}));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box to replace missing readings with 0.' });
  let zeroFill = false;

  const build = () => {
    const rows = zeroFill ? readings.map((r) => ({ ...r, temperature: r.temperature ?? 0 })) : readings;
    return defineChart({
      marks: [
        areaY(rows, { x: 'time', y: 'temperature', fill: '#60a5fa', fillOpacity: 0.2 }),
        lineY(rows, { x: 'time', y: 'temperature', stroke: '#60a5fa', points: true }),
      ],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear().domain([0, 24]), grid: true, axis: { label: 'Temperature (C)' } },
      },
      tooltip,
    });
  };

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Temperature readings with gaps' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    zeroFill = v;
    host.update(options());
    stage.say(v ? 'Missing values replaced with 0' : 'Missing values left as null: the line and area break');
  };
  if (stage.bar) checkbox(stage.bar, 'fill missing with 0', false, set);
  else stage.cycle([false, true], 2000, set);
  return () => stage.dispose();
};

export default mount;

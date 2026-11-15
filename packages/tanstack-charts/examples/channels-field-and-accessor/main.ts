// Channels as field names and as accessors: x is a field, y is computed from two fields
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

interface Account {
  id: string;
  revenue: number;
  accounts: number;
  retained: number;
}

const random = rng(5);
const rows: Account[] = Array.from({ length: 30 }, (_, i) => {
  const accounts = 20 + Math.floor(random() * 180);
  return { id: `a${i}`, revenue: 50 + random() * 450, accounts, retained: Math.floor(accounts * (0.5 + random() * 0.45)) };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The accessor receives (row, { index, data }) and returns the value.' });
  let derived = true;

  const build = () =>
    defineChart({
      marks: [
        dot(rows, {
          x: 'revenue',
          y: derived ? (row) => row.retained / row.accounts : (row) => row.retained,
          r: 4,
          fill: '#60a5fa',
        }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'revenue (field name)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: derived ? 'retained / accounts (accessor)' : 'retained (accessor)' } },
      },
      tooltip,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Revenue against retention' });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.bar) checkbox(stage.bar, 'divide by accounts', derived, (v) => { derived = v; host.update(options()); });
  else {
    stage.cycle([true, false], 2200, (v) => { derived = v; host.update(options()); });
  }
  return () => stage.dispose();
};

export default mount;

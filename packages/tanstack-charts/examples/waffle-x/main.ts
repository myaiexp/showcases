// waffleX: cells fill columns bottom to top, rows sets the column height
import { colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { waffleX } from '@tanstack/charts/waffle';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const votes = [
  { party: 'Green', seats: 40 },
  { party: 'Blue', seats: 56 },
  { party: 'Amber', seats: 32 },
  { party: 'Grey', seats: 12 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (rows: number) =>
    defineChart({
      svgAnimation: true,
      marks: [waffleX(votes, { x: 'seats', color: 'party', rows, gap: 2, radius: 2 })],
      scales: { x: null, y: null },
      color: { legend: colorLegend() },
    });

  const options = { definition: chart(5), height: stage.height, initialWidth: 640, ariaLabel: 'Seats by party as a waffle chart' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (rows: number): void => {
    host.update({ ...options, definition: chart(rows) });
    stage.say(`rows: ${rows}`);
  };

  if (stage.bar) {
    select(stage.bar, 'rows', [4, 5, 7, 10].map((n) => [n, String(n)] as const), show, 5);
    stage.say('rows: 5');
  } else stage.cycle([4, 5, 7, 10], 1800, show);
  return () => stage.dispose();
};

export default mount;

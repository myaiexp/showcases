// waffleY unit: value per complete cell; remainders become partial cells
import { colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { waffleY } from '@tanstack/charts/waffle';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const visitors = [
  { channel: 'Search', count: 143 },
  { channel: 'Direct', count: 91 },
  { channel: 'Social', count: 58 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (unit: number) =>
    defineChart({
      svgAnimation: true,
      marks: [waffleY(visitors, { y: 'count', color: 'channel', unit, gap: 1 })],
      scales: { x: null, y: null },
      color: { legend: colorLegend() },
    });

  const options = { definition: chart(2), height: stage.height, initialWidth: 640, ariaLabel: 'Visitors by channel as a waffle chart' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (unit: number): void => {
    host.update({ ...options, definition: chart(unit) });
    stage.say(`unit: ${unit} (one cell = ${unit} visitors)`);
  };

  if (stage.bar) {
    slider(stage.bar, 'unit', 1, 20, 1, 2, show);
    stage.say('unit: 2 (one cell = 2 visitors)');
  } else stage.cycle([1, 2, 5, 10, 20], 1500, show);
  return () => stage.dispose();
};

export default mount;

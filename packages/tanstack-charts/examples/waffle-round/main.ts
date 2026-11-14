// waffleY round: cumulative boundaries snap to whole cells
import { colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { waffleY } from '@tanstack/charts/waffle';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const thirds = [
  { option: 'Remote', share: 0.334 },
  { option: 'Hybrid', share: 0.333 },
  { option: 'Office', share: 0.333 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (round: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [waffleY(thirds, { y: 'share', color: 'option', unit: 0.01, columns: 10, round, gap: 3 })],
      scales: { x: null, y: null },
      color: { legend: colorLegend() },
    });

  const options = { definition: chart(false), height: stage.height, initialWidth: 640, ariaLabel: 'Work arrangement as a waffle chart' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (round: boolean): void => {
    host.update({ ...options, definition: chart(round) });
    stage.say(`round: ${round}`);
  };

  if (stage.bar) {
    checkbox(stage.bar, 'round', false, show);
    stage.say('round: false');
  } else stage.cycle([false, true], 2200, show);
  return () => stage.dispose();
};

export default mount;

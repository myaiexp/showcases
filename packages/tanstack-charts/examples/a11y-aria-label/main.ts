// ariaLabel: the accessible name and role the SVG surface exposes, read back from the DOM
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { describeSurface } from '../../shared/style-surface.ts';
import { createStage } from '../../shared/stage.ts';

const labels = ['Monthly revenue', 'Revenue by month, January to June 2026, in US dollars'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the label: the readout shows what a screen reader is given.' });
  const readout = stage.bar ? stage.readout() : null;
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  const show = (): void => {
    if (readout) readout.textContent = describeSurface(stage.box);
  };
  const options = (ariaLabel: string) => ({ definition, height: stage.height, ariaLabel });
  const host = stage.own(mountChart(stage.box, options(labels[0]!)));
  show();
  if (stage.bar) textInput(stage.bar, 'ariaLabel', labels[0]!, (v) => { host.update(options(v)); show(); }, 40);
  else stage.cycle(labels, 2200, (label) => { host.update(options(label)); stage.say(`ariaLabel: ${label}`); });
  return () => stage.dispose();
};

export default mount;

// Lifecycle test: element counts across mount, hover and destroy
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the button to mount a chart, hover it, destroy it and compare the counts.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  const all = (): number => document.getElementsByTagName('*').length;
  const status = (): number => document.querySelectorAll('[role="status"]').length;
  let busy = false;

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true } },
    tooltip,
  });
  const cycle = (): void => {
    if (busy) return;
    busy = true;
    const before = `${all()} elements, ${status()} tooltips`;
    const scratch = document.createElement('div');
    scratch.style.height = `${Math.min(stage.height, 120)}px`;
    stage.box.replaceChildren(scratch);
    const host = mountChart(scratch, { definition, height: Math.min(stage.height, 120), initialWidth: 360, ariaLabel: 'Revenue' });
    const at = (type: string): void => {
      const r = scratch.getBoundingClientRect();
      scratch.dispatchEvent(new PointerEvent(type, { clientX: r.left + r.width * 0.5, clientY: r.top + r.height * 0.7, pointerType: 'mouse', pointerId: 1, isPrimary: true, bubbles: false }));
    };
    at('pointerenter');
    at('pointermove');
    // If the example unmounts before the timer below runs, destroy still happens (it is idempotent).
    stage.onDispose(() => host.destroy());
    stage.after(400, () => {
      const during = `${all()} elements, ${status()} tooltips`;
      host.destroy();
      scratch.remove();
      stage.box.textContent = '(the chart was destroyed and removed)';
      stage.box.style.color = 'var(--fg-3)';
      const after = `${all()} elements, ${status()} tooltips`;
      const text = `before mount:  ${before}\nwhile hovering: ${during}\nafter destroy:  ${after}\ncleanup ${before === after ? 'complete' : 'LEFT SOMETHING BEHIND'}`;
      if (readout) readout.textContent = text;
      else stage.say(text.replaceAll('\n', '; '));
      busy = false;
    });
  };
  if (stage.bar) button(stage.bar, 'mount, hover, destroy', cycle);
  else stage.every(2200, cycle);
  stage.after(100, cycle);
  return () => stage.dispose();
};

export default mount;

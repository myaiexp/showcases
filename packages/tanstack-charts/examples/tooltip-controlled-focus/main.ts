// pointer: false plus host.interaction: focus and tooltip appear only while the pointer is held down
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hovering does nothing. Press and hold on the chart, then drag.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    focus: 'group-x',
    pointer: false,
    tooltip,
  });

  const host = stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel, inspected while held' }));
  const inspect = (x: number, y: number): void => host.interaction.setControlledFocus(host.interaction.resolvePointer(x, y));
  const release = (): void => host.interaction.setControlledFocus(null);

  if (stage.preview) {
    // The card plays the hold: sweep for four seconds, release for two.
    const start = performance.now();
    stage.every(80, () => {
      const t = ((performance.now() - start) % 6000) / 6000;
      const r = stage.box.getBoundingClientRect();
      if (t < 0.66) inspect(r.left + r.width * (0.1 + 0.8 * (t / 0.66)), r.top + r.height * 0.5);
      else release();
    });
  } else {
    let held = false;
    const opts = { signal: stage.signal };
    stage.box.addEventListener('pointerdown', (e) => { held = true; inspect(e.clientX, e.clientY); }, opts);
    stage.box.addEventListener('pointermove', (e) => { if (held) inspect(e.clientX, e.clientY); }, opts);
    for (const type of ['pointerup', 'pointercancel', 'pointerleave']) stage.box.addEventListener(type, () => { held = false; release(); }, opts);
  }
  return () => stage.dispose();
};

export default mount;

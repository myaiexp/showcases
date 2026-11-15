// Keyboard focus: arrow keys, Home and End walk the points; onFocusChange reports the same ChartPoint as a pointer
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the chart or Tab to it, then press the arrow keys, Home or End.' });
  const readout = stage.bar ? stage.readout() : null;
  const build = (keyboard: boolean) =>
    defineChart({
      keyboard,
      marks: [lineY(revenue, { id: 'revenue', x: 'month', y: 'revenue', key: 'id', points: true, stroke: '#60a5fa' })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      tooltip,
    });
  const options = (keyboard: boolean) => ({
    definition: build(keyboard),
    height: stage.height,
    ariaLabel: 'Monthly revenue',
    onFocusChange: (point: { datum: unknown; xValue: unknown; yValue: unknown } | null) => {
      const text = point ? `focused: ${JSON.stringify(point.datum)}` : 'no focused point';
      if (readout) readout.textContent = text;
      else if (point) stage.say(text);
    },
  });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) {
    checkbox(stage.bar, 'keyboard', true, (v) => {
      host.update(options(v));
      const root = stage.box.querySelector('svg');
      if (readout) readout.textContent = `keyboard: ${v}, svg tabindex=${root?.getAttribute('tabindex') ?? 'none'}`;
    });
  } else {
    // Cards send key events to the chart element: they bubble only through this card's own ancestors.
    stage.after(400, () => {
      const root = stage.box.querySelector('svg');
      if (!root) return;
      stage.every(900, () => root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })));
    });
  }
  return () => stage.dispose();
};

export default mount;

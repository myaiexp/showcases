// A scripted pointer path against a mounted chart, with the callbacks as the assertions
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run the sequence: the log is what a test would assert on.' });
  if (stage.preview) stage.height -= 58;
  const readout = stage.preview ? null : stage.readout();
  const log: string[] = [];
  const say = (line: string): void => {
    log.push(line);
    const shown = log.slice(-(readout ? 14 : 4));
    if (readout) readout.textContent = shown.join('\n');
    else stage.say(shown.join('\n'));
  };

  const make = (rows: typeof revenue) =>
    defineChart({
      marks: [barY(rows, { x: 'month', y: 'revenue', key: 'month', fill: '#60a5fa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true } },
      tooltip,
    });
  const options = (rows: typeof revenue) => ({
    definition: make(rows),
    height: stage.height,
    initialWidth: 480,
    ariaLabel: 'Revenue',
    onFocusChange: (p: { datum: { month: string } } | null) => say(`  focus -> ${p ? p.datum.month : 'cleared'}`),
    onSelect: (p: { datum: { month: string } } | null) => say(`  select -> ${p ? p.datum.month : 'cleared'}`),
  });
  const host = stage.own(mountChart(stage.box, options(revenue)));

  const fire = (type: string, fx: number, fy: number): void => {
    const r = stage.box.getBoundingClientRect();
    const init = { clientX: r.left + fx * r.width, clientY: r.top + fy * r.height, pointerType: 'mouse', pointerId: 1, isPrimary: true, bubbles: false };
    stage.box.dispatchEvent(type === 'click' ? new MouseEvent('click', init) : new PointerEvent(type, init));
  };
  let running = false;
  const run = (): void => {
    if (running) return;
    running = true;
    log.length = 0;
    // Bars are laid out left to right: about 0.6 of the width is the fourth bar, Apr.
    const script: readonly (readonly [string, () => void])[] = [
      ['1. move to the fourth bar', () => { fire('pointerenter', 0.6, 0.7); fire('pointermove', 0.6, 0.7); }],
      ['2. click it', () => fire('click', 0.6, 0.7)],
      ['3. update without Apr', () => host.update(options(revenue.filter((r) => r.month !== 'Apr')))],
      ['4. move over the same spot', () => fire('pointermove', 0.6, 0.7)],
      ['5. leave the chart', () => stage.box.dispatchEvent(new MouseEvent('mouseleave'))],
    ];
    script.forEach(([name, step], i) => stage.after(500 + i * 650, () => { say(name); step(); if (i === script.length - 1) running = false; }));
  };
  stage.after(50, run);
  if (stage.bar) button(stage.bar, 'run the sequence again', () => { host.update(options(revenue)); run(); });
  else stage.every(5200, () => { host.update(options(revenue)); run(); });
  return () => stage.dispose();
};

export default mount;

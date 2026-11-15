// ChartAdapter: prerender, mount, update, getScene, destroy, one call at a time
import { barY, createChartAdapter, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the step button; the log shows each call and what it returned.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  const scales = { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } };
  const bars = defineChart({ marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })], scales });
  const flipped = defineChart({ marks: [barY(revenue.map((r) => ({ ...r, revenue: 120 - r.revenue })), { x: 'month', y: 'revenue', fill: '#fb923c' })], scales });
  const options = (definition: typeof bars) => ({ definition: definition as never, height: stage.height, initialWidth: 480, ariaLabel: 'Revenue' });

  let adapter = createChartAdapter(options(bars));
  let markup = '';
  const log: string[] = [];
  const say = (line: string): void => {
    log.push(line);
    const shown = log.slice(-(readout ? 12 : 3));
    if (readout) readout.textContent = shown.join('\n');
    else stage.say(shown.join('\n'));
  };
  const steps: readonly (readonly [string, () => void])[] = [
    ['prerender()', () => { markup = adapter.prerender(); say(`prerender() -> ${markup.length} characters; getScene() is ${adapter.getScene() === undefined ? 'undefined' : 'a scene'}`); }],
    ['insert the markup', () => { stage.box.innerHTML = markup; say('markup inserted into the container'); }],
    ['mount(container)', () => { adapter.mount(stage.box); say(`mount() done; getScene() has ${adapter.getScene()?.points.length} points`); }],
    ['mount(container) again', () => { try { adapter.mount(stage.box); say('second mount() returned'); } catch (e) { say(`second mount() threw: ${(e as Error).message}`); } }],
    ['update(options)', () => { adapter.update(options(flipped)); say(`update() done; first point is now ${adapter.getScene()?.points[0]?.yValue}`); }],
    ['destroy()', () => { adapter.destroy(); stage.box.replaceChildren(); say('destroy() done; calling it twice is harmless'); adapter = createChartAdapter(options(bars)); log.push('--- a new controller ---'); }],
  ];
  let i = 0;
  if (readout) readout.textContent = 'press the step button';
  stage.onDispose(() => adapter.destroy());
  const next = (): void => {
    steps[i]![1]();
    i = (i + 1) % steps.length;
    if (nextBtn) nextBtn.textContent = `step: ${steps[i]![0]}`;
  };
  const nextBtn = stage.bar ? button(stage.bar, `step: ${steps[0]![0]}`, next) : null;
  if (!stage.bar) stage.every(900, next);
  return () => stage.dispose();
};

export default mount;

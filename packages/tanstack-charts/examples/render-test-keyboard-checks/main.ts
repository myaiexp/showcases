// Keyboard and name checks against the real host, driven with synthetic events
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The checks run on their own; the button runs them again from a fresh chart state.' });
  if (stage.preview) stage.height -= 70;
  const readout = stage.preview ? null : stage.readout();
  let focused = '';
  let selected = '';

  const definition = defineChart({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 480,
      ariaLabel: 'Monthly revenue',
      ariaDescription: 'Revenue from January to June.',
      onFocusChange: (p) => { focused = p ? p.datum.month : ''; },
      onSelect: (p) => { selected = p ? p.datum.month : ''; },
    }),
  );

  const run = (): void => {
    const svg = stage.box.querySelector('svg')!;
    // Key events bubble to the container, where the host listens.
    const key = (k: string): void => { svg.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true })); };
    const results: [string, boolean][] = [];
    results.push(['root has role img and an accessible name', svg.getAttribute('role') === 'img' && !!svg.getAttribute('aria-label')]);
    results.push(['root is in the tab order (tabindex 0)', svg.getAttribute('tabindex') === '0']);
    svg.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    results.push([`focus enters on the first point (got ${focused || 'nothing'})`, focused === 'Jan']);
    key('ArrowRight');
    results.push([`ArrowRight moves to Feb (got ${focused})`, focused === 'Feb']);
    key('End');
    results.push([`End reaches Jun (got ${focused})`, focused === 'Jun']);
    key('Enter');
    results.push([`Enter selects the focused point (got ${selected || 'nothing'})`, selected === 'Jun']);
    const lines = results.map(([name, ok]) => `${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (readout) readout.textContent = lines.join('\n');
    else stage.say(`${results.filter((r) => r[1]).length} of ${results.length} accessibility checks pass`);
  };
  stage.after(120, run);
  if (stage.bar) button(stage.bar, 'run the checks again', run);
  return () => stage.dispose();
};

export default mount;

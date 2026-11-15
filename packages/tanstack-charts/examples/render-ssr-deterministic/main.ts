// Two renders of one definition: equal hashes when the build is a pure function of its inputs
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

/** FNV-1a, enough to compare two strings at a glance. */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193) >>> 0;
  return h.toString(16).padStart(8, '0');
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the two hashes: a mismatch is what hydration would flag.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const build = (jitter: boolean) =>
    defineChart({
      // A server would never agree with the browser about this value.
      marks: [barY(revenue.map((r) => ({ ...r, revenue: r.revenue + (jitter ? Math.random() * 3 : 0) })), { x: 'month', y: 'revenue', fill: '#60a5fa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  const render = (jitter: boolean): string => renderChartSvg(createChartScene(build(jitter), { width: 480, height: 180 }), { ariaLabel: 'Revenue', idPrefix: 'det' });

  const show = (jitter: boolean): void => {
    const server = render(jitter);
    const browser = render(jitter);
    stage.box.innerHTML = browser;
    const text = `reads Math.random(): ${jitter ? 'yes' : 'no'}\nserver ${hash(server)}   browser ${hash(browser)}   ${server === browser ? 'match' : 'MISMATCH'}`;
    if (readout) readout.textContent = text;
    else stage.say(text.replace('\n', ': '));
  };
  show(false);
  if (stage.bar) checkbox(stage.bar, 'definition reads Math.random()', false, show);
  else stage.cycle([false, true], 2200, show);
  return () => stage.dispose();
};

export default mount;

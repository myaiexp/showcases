// Client-side rendering: load data, build a plot, append it, remove on cleanup
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';

const mount: Mount = async (el, { preview, signal }) => {
  // The React and Vue sections load gistemp.csv with d3.csv(…, d3.autoType) first.
  const data = await csv('gistemp.csv');
  if (signal.aborted) return () => {};

  const plot = Plot.plot({
    width: preview ? 300 : undefined,
    height: preview ? 200 : undefined,
    y: { grid: true },
    color: { scheme: 'burd' },
    marks: [Plot.ruleY([0]), Plot.dot(data, { x: 'Date', y: 'Anomaly', stroke: 'Anomaly' })],
  });
  plot.style.color = 'var(--fg-1)';
  el.append(plot);

  // In a card, replay the dots growing in: the plot is plain SVG, so the page can animate it.
  let timer = 0;
  if (preview) {
    const grow = (): void => {
      plot.querySelectorAll('circle').forEach((c, i) => {
        c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: i * 0.6, fill: 'backwards' });
      });
    };
    grow();
    timer = window.setInterval(grow, 4000);
  }

  // The effect's cleanup in the React section: () => plot.remove().
  return () => {
    clearInterval(timer);
    plot.remove();
  };
};

export default mount;

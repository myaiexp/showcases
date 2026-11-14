// A mark that is a function returning an SVG element: a gradient for the bars
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const NS = 'http://www.w3.org/2000/svg';

// Builds <defs><linearGradient id="marks-svg-gradient">…</linearGradient></defs> by hand.
function gradientDefs(): SVGElement {
  const defs = document.createElementNS(NS, 'defs');
  const gradient = document.createElementNS(NS, 'linearGradient');
  gradient.setAttribute('id', 'marks-svg-gradient');
  gradient.setAttribute('gradientTransform', 'rotate(90)');
  for (const [offset, color] of [['15%', 'purple'], ['75%', 'red'], ['100%', 'gold']] as const) {
    const stop = document.createElementNS(NS, 'stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', color);
    gradient.append(stop);
  }
  defs.append(gradient);
  return defs;
}

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [gradientDefs, Plot.barY(alphabet, { x: 'letter', y: 'frequency', fill: 'url(#marks-svg-gradient)' }), Plot.ruleY([0])],
    }),
  );
};

export default mount;

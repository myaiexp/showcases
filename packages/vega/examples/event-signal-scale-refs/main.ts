// Streams can be signal references and scale references, alone or in an array
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 140,
    padding: 5,

    signals: [
      { name: 'top', value: 50, bind: { input: 'range', min: 20, max: 100, step: 5, name: 'Axis maximum' } },
      // {signal: name}: fires whenever that signal changes.
      { name: 'signalFired', value: 0, on: [{ events: { signal: 'top' }, update: 'signalFired + 1' }] },
      // {scale: name}: fires whenever the scale is modified (its domain follows `top`).
      { name: 'scaleFired', value: 0, on: [{ events: { scale: 'x' }, update: 'scaleFired + 1' }] },
      // An array merges references and ordinary streams.
      { name: 'either', value: 0, on: [{ events: [{ signal: 'top' }, { type: 'click' }], update: 'either + 1' }] },
    ],

    scales: [{ name: 'x', type: 'linear', domain: [0, { signal: 'top' }], range: 'width', zero: true }],
    axes: [{ orient: 'bottom', scale: 'x' }],

    marks: [
      line("'{signal: top} fired       ' + signalFired", 4),
      line("'{scale: x} fired          ' + scaleFired", 24),
      line("'[{signal}, click] fired   ' + either + '  (click too)'", 44),
      {
        type: 'rect',
        encode: { update: { x: { scale: 'x', value: 0 }, x2: { scale: 'x', value: 30 }, y: { value: 80 }, height: { value: 24 }, fill: { value: 'steelblue' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'top', [90, 30, 70, 50], 1200);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(2500, () => ghost.click(300, 60));
  }
  return () => stage.dispose();
};

export default mount;

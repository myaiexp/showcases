// vega-interpreter evaluates every expression by walking its AST, no Function constructor
import * as vega from 'vega';
import type { Spec } from 'vega';
import { expressionInterpreter } from 'vega-interpreter';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // Expressions in every place they can appear: a signal update, a bound input, a formula
  // transform, encode values and an event handler.
  const spec: Spec = {
    width: 400,
    height: 220,
    padding: 5,
    signals: [
      { name: 'phase', value: 0, bind: { input: 'range', min: 0, max: 6.28, step: 0.01 } },
      { name: 'amp', update: '0.6 + 0.4 * cos(phase)' },
      { name: 'picked', value: null, on: [{ events: 'symbol:mouseover', update: 'datum.i' }] },
    ],
    data: [
      {
        name: 'wave',
        transform: [
          { type: 'sequence', start: 0, stop: 40, as: 'i' },
          { type: 'formula', as: 'y', expr: 'amp * sin(datum.i / 40 * 2 * PI * 2 + phase)' },
        ],
      },
    ],
    scales: [
      { name: 'x', domain: [0, 39], range: 'width' },
      { name: 'y', domain: [-1, 1], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'wave' },
        encode: {
          update: {
            x: { scale: 'x', field: 'i' },
            y: { scale: 'y', field: 'y' },
            size: { signal: 'datum.i === picked ? 220 : 60' },
            fill: { signal: "datum.y > 0 ? '#f59e0b' : '#60a5fa'" },
          },
        },
      },
      {
        type: 'text',
        encode: {
          enter: { x: { value: 0 }, y: { value: -2 }, fill: { value: '#ddd' }, fontSize: { value: 12 } },
          update: { text: { signal: "'amp = ' + format(amp, '.2f') + (picked != null ? ', point ' + picked : '')" } },
        },
      },
    ],
  };

  // Count what the interpreter is asked to evaluate, by wrapping each of its five entry points.
  const counts: Record<string, number> = {};
  const counted = Object.fromEntries(
    Object.entries(expressionInterpreter).map(([kind, fn]) => [
      kind,
      (...args: unknown[]) => {
        counts[kind] = (counts[kind] ?? 0) + 1;
        return (fn as (...a: unknown[]) => unknown)(...args);
      },
    ]),
  );

  // Step 2 of the docs: parse with {ast: true}, so the runtime holds syntax trees, not code.
  const runtime = vega.parse(spec, stage.config, { ast: true });
  // Step 3: hand the interpreter to the View as its `expr` evaluator.
  const view = stage.adopt(
    new vega.View(runtime, { ...stage.options, expr: counted, renderer: 'canvas', hover: true, logLevel: vega.Warn } as vega.ViewOptions),
  );
  await view.runAsync();

  if (!stage.preview) {
    const out = readout(el);
    out.textContent = `Expressions handed to the interpreter while the view was built: ${Object.entries(counts)
      .map(([k, n]) => `${k} ${n}`)
      .join(', ')}.\nNo expression was compiled with the Function constructor.`;
  }
  cycle(stage, view, 'phase', Array.from({ length: 24 }, (_, i) => (i / 24) * 6.28), 250);
  return () => stage.dispose();
};

export default mount;

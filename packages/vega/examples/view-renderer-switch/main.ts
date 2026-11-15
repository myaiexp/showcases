// view.renderer() swaps canvas for SVG on a live view and the animation goes on
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

type Kind = 'canvas' | 'svg';
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 170,
    padding: 8,
    signals: [{ name: 'phase', value: 0 }, { name: 'kind', value: 'canvas' }],
    data: [{ name: 'dots', values: Array.from({ length: 14 }, (_, i) => ({ i })) }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 13], range: 'width' },
      { name: 'c', type: 'linear', domain: [0, 13], range: ['steelblue', '#f59e0b'] },
    ],
    marks: [
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { scale: 'x', field: 'i' }, y: { signal: 'height / 2 + sin(datum.i / 2 + phase) * height * 0.35' }, size: { signal: '300 + 160 * cos(datum.i + phase)' }, fill: { scale: 'c', field: 'i' }, tooltip: { signal: 'datum.i' } }, hover: { stroke: { value: '#fff' }, strokeWidth: { value: 3 } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -2 }, text: { signal: "'renderer: ' + kind" }, fill: { value: '#f59e0b' }, font: { value: 'monospace' }, fontSize: { value: 12 } } } },
    ],
  };

  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn, renderer: 'canvas', hover: true } as ViewOptions));
  await view.runAsync();

  let kind: Kind = 'canvas';
  const choose = async (next: Kind): Promise<void> => {
    kind = next;
    // renderer() resets the renderer; runAsync redraws into the same container.
    view.renderer(next).signal('kind', next);
    await view.runAsync();
  };
  if (stage.bar) select(stage.bar, 'renderer', ['canvas', 'svg'] as const, kind, (v) => void choose(v));
  stage.every(70, (i) => {
    view.signal('phase', i / 9);
    // Cards flip renderer every 36 frames (about 2.5 s).
    if (stage.preview && i % 36 === 0) view.renderer(i % 72 === 0 ? 'canvas' : 'svg').signal('kind', i % 72 === 0 ? 'canvas' : 'svg');
    return view.runAsync().then(() => undefined);
  });
  return () => stage.dispose();
};

export default mount;

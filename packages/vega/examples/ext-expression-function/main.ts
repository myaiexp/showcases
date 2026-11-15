// vega.expressionFunction adds functions to the expression language
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Registered before parsing, as the docs require. Both names are ours, so they cannot collide.
const snap = (x: number, step: number): number => Math.round(x / step) * step;
vega.expressionFunction('showcaseSnap', snap);
vega.expressionFunction('showcaseWobble', (i: number, t: number, amp: number) => amp * Math.sin(i * 0.9 + t / 14));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // The registry answers a lookup with the function itself.
  const registered = vega.expressionFunction('showcaseSnap') === snap;

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: { left: 8, right: 8, top: 22, bottom: 8 },
    signals: [
      { name: 'step', value: 20, bind: { input: 'range', min: 2, max: 50, step: 1 } },
      { name: 'tick', value: 0 },
    ],
    data: [{ name: 'pts', values: Array.from({ length: 36 }, (_, i) => ({ i, base: 100 + 70 * Math.sin(i / 4) })) }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 35], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 200], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [
      { type: 'rule', from: { data: 'pts' }, encode: { update: { x: { scale: 'x', field: 'i' }, y: { scale: 'y', signal: 'datum.base + showcaseWobble(datum.i, tick, 14)' }, y2: { scale: 'y', signal: 'showcaseSnap(datum.base + showcaseWobble(datum.i, tick, 14), step)' }, stroke: { value: '#6b7280' } } } },
      { type: 'symbol', from: { data: 'pts' }, encode: { update: { x: { scale: 'x', field: 'i' }, y: { scale: 'y', signal: 'datum.base + showcaseWobble(datum.i, tick, 14)' }, size: { value: 22 }, fill: { value: '#7dd3fc' } } } },
      { type: 'symbol', from: { data: 'pts' }, encode: { update: { x: { scale: 'x', field: 'i' }, y: { scale: 'y', signal: 'showcaseSnap(datum.base + showcaseWobble(datum.i, tick, 14), step)' }, shape: { value: 'square' }, size: { value: 36 }, fill: { value: '#f59e0b' } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -6 }, text: { signal: `'showcaseSnap(y, ' + step + ')  (blue: raw, orange: snapped)${registered ? '' : ' - not registered'}'` }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = await stage.render(spec);
  stage.every(110, (i) => {
    view.signal('tick', i);
    // Cards also sweep the step, so the snapping visibly coarsens and refines.
    if (stage.preview) view.signal('step', 26 + 22 * Math.sin(i / 20));
    return view.runAsync().then(() => undefined);
  });
  return () => stage.dispose();
};

export default mount;

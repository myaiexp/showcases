// view.hover("over", "rest") names the encode sets used on mouseover and mouseout
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const cols = 8;
  const rows = 4;
  // No "hover" or "update-after-hover" anywhere: the sets are called "over" and "rest", and the
  // view is told so. Without the hover() call neither set would ever run.
  const spec: Spec = {
    width: 400,
    height: 170,
    padding: 8,
    data: [{ name: 'cells', values: Array.from({ length: cols * rows }, (_, n) => ({ c: n % cols, r: Math.floor(n / cols) })) }],
    scales: [
      { name: 'x', type: 'band', domain: Array.from({ length: cols }, (_, i) => i), range: 'width', padding: 0.15 },
      { name: 'y', type: 'band', domain: Array.from({ length: rows }, (_, i) => i), range: 'height', padding: 0.15 },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'cells' },
        // The typings accept only the standard set names, so this encode block is cast.
        encode: {
          enter: { x: { scale: 'x', field: 'c' }, y: { scale: 'y', field: 'r' }, width: { scale: 'x', band: 1 }, height: { scale: 'y', band: 1 }, cornerRadius: { value: 3 } },
          update: { fill: { value: '#2f3b52' }, opacity: { value: 1 } },
          rest: { fill: { value: '#2f3b52' }, opacity: { value: 1 } },
          over: { fill: { value: '#f59e0b' }, opacity: { value: 0.95 } },
        } as never,
      },
      { type: 'text', from: { data: 'cells' }, interactive: false, encode: { update: { x: { scale: 'x', field: 'c', band: 0.5 }, y: { scale: 'y', field: 'r', band: 0.5 }, align: { value: 'center' }, baseline: { value: 'middle' }, text: { signal: 'datum.r * 8 + datum.c' }, fill: { value: '#c9d1e0' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  view.hover('over' as never, 'rest' as never);
  await view.runAsync();

  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    const y = view.scale('y');
    stage.every(320, (i) => {
      const c = (i * 3) % cols;
      const r = Math.floor((i * 3) / cols) % rows;
      ghost.move(x(c) + x.bandwidth() / 2, y(r) + y.bandwidth() / 2);
    });
  }
  return () => stage.dispose();
};

export default mount;

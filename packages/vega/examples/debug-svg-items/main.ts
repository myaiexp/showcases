// In SVG every element's __data__ is its scenegraph item, __data__.datum the row
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole, show } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

interface Item {
  datum?: unknown;
  mark?: { marktype?: string };
  fill?: string;
  x?: number;
  y?: number;
  height?: number;
}
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 180, width: 470, rows: 5, title: 'element.__data__' });

  const spec: Spec = {
    width: 440,
    height: 150,
    padding: 8,
    data: [{ name: 'table', values: ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'].map((name, i) => ({ name, score: 20 + ((i * 37) % 75) })) }, con.data],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'name' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', labelFontSize: 10 }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'name' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'score' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } }, hover: { fill: { value: '#f59e0b' } } } }, ...con.marks],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn, renderer: 'svg', hover: true } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 5);

  // What the console's `$0.__data__` does by hand: any element of the SVG leads back to its item and row.
  const inspect = async (node: Element | null): Promise<void> => {
    const item = (node as unknown as { __data__?: Item } | null)?.__data__;
    if (!item) return;
    out.clear();
    out.push(
      `element: <${node?.tagName.toLowerCase()}>  class "${node?.parentElement?.getAttribute('class') ?? ''}"`,
      `__data__.mark.marktype = ${show(item.mark?.marktype)}   x ${show(item.x)}  y ${show(item.y)}  height ${show(item.height)}`,
      `__data__.datum = ${show(item.datum)}`,
    );
    await out.show();
  };
  const bars = (): Element[] => [...stage.options.container.querySelectorAll('.mark-rect.role-mark path')];
  const root = stage.options.container;
  const click = (e: Event): void => void inspect(e.target as Element);
  root.addEventListener('click', click);
  stage.own(() => root.removeEventListener('click', click));
  await inspect(bars()[0] ?? null);
  if (stage.preview) stage.every(900, (i) => inspect(bars()[i % Math.max(1, bars().length)] ?? null));
  return () => stage.dispose();
};

export default mount;

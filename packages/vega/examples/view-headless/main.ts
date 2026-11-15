// A view with no container still renders: toSVG() returns the chart as markup
import * as vega from 'vega';
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 150,
    padding: 8,
    signals: [{ name: 'k', value: 1 }],
    data: [{ name: 'table', values: Array.from({ length: 12 }, (_, i) => ({ i })) }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'i' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 1], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 4 }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', signal: 'abs(sin(datum.i * k / 3))' }, y2: { scale: 'y', value: 0 }, fill: { value: '#f59e0b' } } } }],
  };
  // No container option, no initialize(): renderer 'none' is the server-side shape of a view.
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { logLevel: vega.Warn, renderer: 'none', loader: stage.loader }));
  await view.runAsync();

  const host = stage.options.container;
  const note = document.createElement('div');
  note.style.cssText = 'font:11px monospace;color:var(--fg-2);margin-top:6px';
  host.parentElement?.append(note);
  stage.own(() => note.remove());

  let markup: HTMLPreElement | null = null;
  if (!stage.preview) {
    markup = document.createElement('pre');
    markup.style.cssText = 'margin:10px 0 0;width:100%;max-height:170px;overflow:auto;font-size:11px;white-space:pre-wrap;word-break:break-all;color:var(--fg-2)';
    el.append(markup);
    stage.own(() => markup?.remove());
  }

  // Every call renders the current state to an SVG string, which is parsed and placed on the page.
  const paint = async (): Promise<void> => {
    const svg = await view.toSVG();
    if (stage.disposed) return;
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    host.replaceChildren(document.importNode(doc.documentElement, true));
    note.textContent = `view.container() = ${String(view.container())}   toSVG(): ${svg.length} characters`;
    if (markup) markup.textContent = `${svg.slice(0, 700)}…`;
  };
  await paint();
  let busy = false;
  stage.every(stage.preview ? 700 : 900, async (i) => {
    if (busy) return;
    busy = true;
    view.signal('k', 1 + ((i * 7) % 10) / 2);
    await view.runAsync();
    await paint();
    busy = false;
  });
  return () => stage.dispose();
};

export default mount;

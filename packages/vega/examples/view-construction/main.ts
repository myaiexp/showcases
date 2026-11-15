// One bar chart built with constructor options and again with a method chain
import * as vega from 'vega';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const row = stage.options.container;
  row.style.display = 'flex';
  row.style.gap = '16px';

  const spec: Spec = {
    width: 220,
    height: 130,
    padding: 6,
    data: [{ name: 'table', values: [{ k: 'A', v: 28 }, { k: 'B', v: 55 }, { k: 'C', v: 43 }, { k: 'D', v: 91 }, { k: 'E', v: 61 }] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.1 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 4 }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } }, hover: { fill: { value: '#f59e0b' } } } }],
  };
  const runtime = vega.parse(spec, stage.config);
  const pane = (code: string): { host: HTMLElement; cap: HTMLElement } => {
    const wrap = document.createElement('div');
    const host = document.createElement('div');
    const cap = document.createElement('pre');
    cap.style.cssText = 'margin:6px 0 0;font-size:10.5px;color:var(--fg-2);white-space:pre';
    cap.textContent = code;
    wrap.append(host, cap);
    row.append(wrap);
    return { host, cap };
  };
  const left = pane("new View(runtime, {\n  logLevel: Warn, renderer: 'canvas',\n  container, hover: true,\n  background: '#161b24', loader })");
  const right = pane("new View(runtime, {loader})\n  .logLevel(Warn).renderer('canvas')\n  .initialize(container).hover()\n  .background('#1d2430')");

  // 1. Everything as constructor options: nothing else to call before runAsync.
  const byOptions: View = stage.adopt(
    new vega.View(runtime, { loader: stage.loader, logLevel: vega.Warn, renderer: 'canvas', container: left.host, bind: stage.options.bind, hover: true, background: '#161b24' } as ViewOptions),
  );
  // 2. The same configuration as a chain. hover() must be called only once, and the loader belongs
  // in the constructor options because data requests start at construction.
  const byChain: View = stage
    .adopt(new vega.View(vega.parse(spec, stage.config), { loader: stage.loader } as ViewOptions))
    .logLevel(vega.Warn)
    .renderer('canvas')
    .initialize(right.host, stage.options.bind)
    .hover()
    .background('#1d2430')
    .description('A bar chart built with a View method chain');
  await Promise.all([byOptions.runAsync(), byChain.runAsync()]);

  if (stage.preview) {
    const cats = ['A', 'B', 'C', 'D', 'E'];
    const g1 = stage.ghost(byOptions);
    const g2 = stage.ghost(byChain);
    stage.every(650, (i) => {
      const k = cats[i % cats.length] ?? 'A';
      const gx = (i % 2 ? g1 : g2);
      const view = i % 2 ? byOptions : byChain;
      const x = view.scale('x');
      gx.move(x(k) + x.bandwidth() / 2, 100);
    });
  }
  right.cap.title = `aria-label: ${byChain.description()}`;
  return () => stage.dispose();
};

export default mount;

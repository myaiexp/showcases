// toImageURL, toCanvas and toSVG turn the view into a PNG, a canvas and SVG markup
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 280,
    height: 140,
    padding: 8,
    signals: [{ name: 'phase', value: 0 }, { name: 'sizes', value: '' }],
    data: [{ name: 'dots', values: Array.from({ length: 24 }, (_, i) => ({ i })) }],
    scales: [{ name: 'x', type: 'linear', domain: [0, 23], range: 'width' }],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 6 }],
    marks: [
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { scale: 'x', field: 'i' }, y: { signal: 'height / 2 + sin(datum.i / 3 + phase) * 48' }, size: { value: 90 }, fill: { signal: "'hsl(' + (200 + datum.i * 6 + phase * 20) + ', 70%, 60%)'" } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -1 }, text: { signal: 'sizes' }, fill: { value: '#f59e0b' }, font: { value: 'monospace' }, fontSize: { value: 10 } } } },
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn, renderer: 'canvas' } as ViewOptions));
  await view.runAsync();

  // Full view only: the results laid out beside the chart. No download, no network.
  let png: HTMLImageElement | null = null;
  let markup: HTMLPreElement | null = null;
  let svgUrl: string | null = null;
  if (!stage.preview) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-top:12px;width:100%';
    png = document.createElement('img');
    png.alt = 'PNG snapshot from view.toImageURL';
    png.style.cssText = 'width:300px;border:1px solid var(--line, #333)';
    markup = document.createElement('pre');
    markup.style.cssText = 'margin:0;flex:1;min-width:260px;max-height:200px;overflow:auto;font-size:11px;white-space:pre-wrap;word-break:break-all;color:var(--fg-2)';
    wrap.append(png, markup);
    el.append(wrap);
    stage.own(() => wrap.remove());
  }
  stage.own(() => svgUrl && URL.revokeObjectURL(svgUrl));

  const snapshot = async (): Promise<void> => {
    // scaleFactor 2: the output is twice the view's size.
    const [url, canvas, svg] = await Promise.all([view.toImageURL('png', 2), view.toCanvas(2), view.toSVG()]);
    const summary = `png ${canvas.width}×${canvas.height}px   svg ${svg.length} chars`;
    view.signal('sizes', summary);
    if (png) png.src = url;
    if (markup) markup.textContent = `${summary}\n\ntoSVG():\n${svg.slice(0, 520)}…`;
    await view.runAsync();
  };
  await snapshot();
  stage.every(stage.preview ? 140 : 500, async (i) => {
    view.signal('phase', i / 4);
    await view.runAsync();
    if (i % (stage.preview ? 6 : 2) === 0) await snapshot();
  });
  return () => stage.dispose();
};

export default mount;

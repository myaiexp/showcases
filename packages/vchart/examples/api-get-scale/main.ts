// getScale('color'): read the colour scale's domain and range and draw a swatch list from it
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { CATS, SERIES, barSpec } from '../../shared/api-data.ts';
import { groupedRows } from '../../shared/components-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:12px;align-items:flex-start;width:100%';
  el.append(wrap);
  const left = document.createElement('div');
  left.style.cssText = 'flex:1 1 0;min-width:0';
  wrap.append(left);
  const swatches = document.createElement('div');
  swatches.style.cssText = `display:flex;flex-direction:column;gap:4px;font-size:${ctx.preview ? 10 : 13}px;min-width:${ctx.preview ? 70 : 120}px`;
  wrap.append(swatches);

  const { vchart, release } = createChart(el, ctx, barSpec({ legend: false }), { parent: left, previewHeight: 200, height: 320 });
  const out = bar ? readout(el) : null;
  let alive = true;
  let count = 3;

  const read = (): void => {
    if (!alive) return;
    // 'color' is the chart's global colour scale; its domain holds the series keys.
    const scale = vchart.getScale('color') as unknown as { domain(): string[]; range(): string[]; scale(v: string): string };
    const domain = scale.domain();
    swatches.replaceChildren(
      ...domain.map((key) => {
        const row = document.createElement('div');
        const dot = document.createElement('span');
        dot.style.cssText = `display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;background:${scale.scale(key)}`;
        row.append(dot, key);
        return row;
      }),
    );
    if (out) out.textContent = `domain: ${JSON.stringify(domain)}\nrange:  ${JSON.stringify(scale.range().slice(0, domain.length))}`;
  };
  window.setTimeout(read, 300);

  const setCount = (n: number): void => {
    if (!alive) return;
    count = n;
    const groups = ['North', 'South', 'East', 'West', 'Centre'].slice(0, n);
    void vchart.updateData('main', groupedRows(CATS, groups, 1)).then(() => {
      window.setTimeout(read, 200);
    });
  };
  if (bar) {
    button(bar, 'Add a series', () => setCount(Math.min(5, count + 1)));
    button(bar, 'Remove a series', () => setCount(Math.max(2, count - 1)));
    button(bar, 'Reset', () => setCount(SERIES.length));
  }
  let i = 0;
  const stop = bar ? () => {} : every(1800, () => setCount([4, 5, 3][i++ % 3] as number));
  return () => {
    alive = false;
    stop();
    release();
    wrap.remove();
  };
};

export default mount;

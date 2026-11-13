// Shared ECharts setup: sized container, dark-theme init, resize, dispose, controls
import * as echarts from 'echarts';
import type { EChartsInitOpts, EChartsType } from 'echarts';
import darkTheme from 'echarts/lib/theme/dark.js';
import type { MountContext } from '@/types.ts';

export { echarts };

/**
 * ECharts' own 'dark' theme with a transparent background, so charts sit on the page's
 * surface instead of a navy panel. Registered once under its own name (echarts.md §
 * registerTheme); examples about themes pass 'dark' or their own theme instead.
 */
export const THEME = 'showcase-dark';
echarts.registerTheme(THEME, { ...darkTheme, backgroundColor: 'transparent' });

export interface ChartOptions {
  /** Container height in the full view, in CSS pixels. */
  height?: number;
  /** Container height in a preview card; 200 fills the card. Smaller when charts share it. */
  previewHeight?: number;
  /** Theme passed to echarts.init. Defaults to THEME, the built-in dark theme on a transparent background. */
  theme?: string | object;
  /** Extra init options (renderer, locale, useDirtyRect …). */
  init?: EChartsInitOpts;
  /** Where the container goes; defaults to the mount element. */
  parent?: HTMLElement;
}

export interface Chart {
  chart: EChartsType;
  container: HTMLDivElement;
  dispose(): void;
}

/**
 * ECharts 6 traps found while building this gallery, for whoever adds the next example:
 * - The v6 default theme puts the legend at the bottom; an explicit small grid.bottom
 *   puts it on top of the x-axis labels.
 * - api.style() in a custom renderItem warns as deprecated; use api.visual('color').
 * - The option docs list gauge as placeable on a matrix, but 6.1 gauges ignore
 *   coordinateSystem and centre on the canvas.
 * - Panning dataZoom faster than its update animation piles up moving axis labels.
 *
 * What chart-size.md describes by hand: a container with a defined width and height, an
 * instance from echarts.init, resize() whenever the container's size changes (the
 * ResizeObserver the docs' tip suggests), and dispose() when the container goes away.
 * The site is dark, so charts default to THEME.
 */
export function createChart(el: HTMLElement, { preview }: MountContext, options: ChartOptions = {}): Chart {
  const container = document.createElement('div');
  container.style.width = '100%';
  // The height is set before init: echarts.init reads the container's size.
  container.style.height = `${preview ? (options.previewHeight ?? 200) : (options.height ?? 420)}px`;
  (options.parent ?? el).append(container);

  const chart = echarts.init(container, options.theme ?? THEME, options.init);
  // A detached or hidden container measures 0×0; resizing to that only makes ECharts warn
  // (chart-size.md: init and resize need a container with a real width and height).
  const observer = new ResizeObserver(() => {
    if (container.clientWidth > 0 && container.clientHeight > 0) chart.resize();
  });
  observer.observe(container);

  return {
    chart,
    container,
    dispose() {
      observer.disconnect();
      chart.dispose();
      container.remove();
    },
  };
}

/** A row for an example's controls, placed above the chart. Not used in previews. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  bar.style.display = 'flex';
  bar.style.flexWrap = 'wrap';
  bar.style.gap = '8px';
  bar.style.alignItems = 'center';
  bar.style.width = '100%';
  bar.style.padding = '8px 0';
  bar.style.fontSize = '13px';
  el.append(bar);
  return bar;
}

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

export function select(bar: HTMLElement, label: string, values: readonly string[], onChange: (v: string) => void): HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  const sel = document.createElement('select');
  for (const v of values) sel.add(new Option(v, v));
  sel.addEventListener('change', () => onChange(sel.value));
  wrap.append(label, sel);
  bar.append(wrap);
  return sel;
}

export function slider(
  bar: HTMLElement,
  label: string,
  [min, max, step]: readonly [number, number, number],
  value: number,
  onInput: (v: number) => void,
): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  const text = document.createElement('span');
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const show = (): void => {
    text.textContent = `${label} ${input.value}`;
  };
  input.addEventListener('input', () => {
    show();
    onInput(Number(input.value));
  });
  show();
  wrap.append(text, input);
  bar.append(wrap);
  return input;
}

/** Runs `tick` every `ms` until the returned stop function is called. */
export function every(ms: number, tick: () => void): () => void {
  const id = window.setInterval(tick, ms);
  return () => window.clearInterval(id);
}

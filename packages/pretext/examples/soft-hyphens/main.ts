// Lays the same long-word text out with and without soft hyphens; a hyphenated line ends in '-' and its width counts it
import '@fontsource-variable/inter';
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { WITH_HYPHENS, WITHOUT_HYPHENS } from './data.ts';
import './style.css';

const LINE_HEIGHT = 20;

const mount: Mount = async (el, { preview, signal }) => {
  const fontSize = preview ? 13 : 16;
  const font = `${fontSize}px "Inter Variable"`;
  const lineHeight = preview ? 18 : LINE_HEIGHT;
  await document.fonts.load(font, WITH_HYPHENS);
  if (signal.aborted) return () => {};

  // Soft hyphens go in the string before prepare(); they stay invisible unless a line breaks at one.
  const withSoft = prepareWithSegments(WITH_HYPHENS, font);
  const without = prepareWithSegments(WITHOUT_HYPHENS, font);

  const makeColumn = (title: string): { root: HTMLElement; body: HTMLElement } => {
    const root = document.createElement('section');
    root.className = 'col';
    const h = document.createElement('h4');
    h.textContent = title;
    const body = document.createElement('div');
    body.className = 'body';
    body.style.cssText = `font:${font};line-height:${lineHeight}px`;
    root.append(h, body);
    return { root, body };
  };
  const a = makeColumn('with soft hyphens');
  const b = makeColumn('without');
  const readout = document.createElement('p');
  readout.className = 'readout';
  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.append(a.root, b.root);

  // Check paragraph: the browser wrapping the same string by itself (full view only).
  const probe = document.createElement('div');
  probe.className = 'probe';
  probe.style.cssText = `font:${font};line-height:${lineHeight}px`;

  const paint = (body: HTMLElement, prepared: typeof withSoft, width: number): { count: number; hyphenated: number } => {
    const { lines } = layoutWithLines(prepared, width, lineHeight);
    let hyphenated = 0;
    body.style.width = `${width}px`;
    body.replaceChildren(
      ...lines.map((line) => {
        const div = document.createElement('div');
        div.className = 'line';
        if (line.text.endsWith('-')) {
          hyphenated++;
          div.append(line.text.slice(0, -1));
          const mark = document.createElement('span');
          mark.className = 'hy';
          mark.textContent = '-';
          div.append(mark);
        } else div.textContent = line.text;
        return div;
      }),
    );
    return { count: lines.length, hyphenated };
  };

  const render = (width: number): void => {
    const x = paint(a.body, withSoft, width);
    const y = paint(b.body, without, width);
    if (preview) return;
    let text = `${width}px: ${x.count} lines (${x.hyphenated} end in a hyphen) vs ${y.count} lines without`;
    // Let the browser wrap the same text (hyphens: manual is its default) and compare line counts.
    const dom = (s: string): number => {
      probe.style.width = `${width}px`;
      probe.textContent = s;
      return Math.round(probe.getBoundingClientRect().height / lineHeight);
    };
    const d1 = dom(WITH_HYPHENS);
    const d2 = dom(WITHOUT_HYPHENS);
    text += d1 === x.count && d2 === y.count ? ' · DOM agrees' : ` · DOM says ${d1} and ${d2}`;
    readout.textContent = text;
  };

  if (preview) {
    grid.style.cssText = 'height:196px;overflow:hidden';
    el.append(grid);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(72 + 48 * (0.5 + 0.5 * Math.sin(t / 1100))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '90';
  slider.max = '320';
  slider.value = '170';
  const label = document.createElement('label');
  label.className = 'controls';
  label.append('Column width ', slider);
  el.append(label, readout, grid, probe);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

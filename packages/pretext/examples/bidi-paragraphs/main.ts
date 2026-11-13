// Paints mixed-direction paragraphs as one DOM element each, beside a line-by-line canvas
import '@fontsource-variable/inter';
import { layout, layoutWithLines, prepare, prepareWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { FONT, FAMILY, LINE_HEIGHT, PARAS as ALL_PARAS, PREVIEW_PARA } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  // The preview shows one short Arabic paragraph, which fits the card.
  const PARAS = preview ? [PREVIEW_PARA] : ALL_PARAS;
  const all = PARAS.map(p => p.text).join('\n');
  await document.fonts.load(FONT, all);
  if (signal.aborted) return () => {};

  // One handle per paragraph: prepareWithSegments() also serves layout(), and gives lines for the canvas.
  const handles = PARAS.map(p => prepareWithSegments(p.text, FONT));
  // The same text as one pre-wrap element: paragraphs split by newlines, each ordered by its own first strong letter.
  const joined = prepare(all, FONT, { whiteSpace: 'pre-wrap' });

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const cols = document.createElement('div');
  cols.className = 'cols';
  const domCol = document.createElement('div');
  domCol.className = 'col';
  const canvasCol = document.createElement('div');
  canvasCol.className = 'col';
  const heading = (text: string): HTMLElement => {
    const h = document.createElement('h4');
    h.textContent = text;
    return h;
  };
  const paras = document.createElement('div');
  paras.className = 'paras';
  const els = PARAS.map(p => {
    const e = document.createElement('p');
    e.className = 'para';
    e.dir = p.dir; // each paragraph is ONE element with its direction set
    e.style.font = FONT;
    e.style.lineHeight = `${LINE_HEIGHT}px`;
    e.textContent = p.text;
    paras.append(e);
    return e;
  });
  const canvas = document.createElement('canvas');
  // Headings are wider than the preview's columns, so only the full view has them.
  domCol.append(...(preview ? [] : [heading('DOM: one element per paragraph')]), paras);
  canvasCol.append(...(preview ? [] : [heading('Canvas: each line painted alone')]), canvas);
  cols.append(domCol, canvasCol);

  let plain: HTMLElement | null = null;
  if (!preview) {
    plain = document.createElement('p');
    plain.className = 'para plain';
    plain.style.font = FONT;
    plain.style.lineHeight = `${LINE_HEIGHT}px`;
    plain.textContent = all;
    const col = document.createElement('div');
    col.className = 'col';
    col.append(heading('DOM: one pre-wrap element, unicode-bidi: plaintext'), plain);
    cols.append(col);
  }

  const render = (width: number): void => {
    const notes: string[] = [];
    const dpr = window.devicePixelRatio || 1;
    let total = 0;
    const lineSets = PARAS.map((_, i) => {
      const p = handles[i];
      if (!p) return { lines: [] as string[], height: 0 };
      const { lines, height } = layoutWithLines(p, width, LINE_HEIGHT);
      total += height + 8;
      return { lines: lines.map(l => l.text), height };
    });
    els.forEach((e, i) => {
      e.style.width = `${width}px`;
      const h = lineSets[i]?.height ?? 0;
      const dom = e.getBoundingClientRect().height;
      notes.push(`paragraph ${i + 1}: Pretext ${h}px, DOM ${dom}px`);
    });
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(total * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${total}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.font = FONT;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = getComputedStyle(el).getPropertyValue('--fg-1') || '#ddd';
      let y = 0;
      PARAS.forEach((p, i) => {
        // Each fillText() orders its own line as a paragraph: the caveat in the CHANGELOG.
        ctx.direction = p.dir;
        ctx.textAlign = p.dir === 'rtl' ? 'right' : 'left';
        (lineSets[i]?.lines ?? []).forEach((text, n) => {
          ctx.fillText(text, p.dir === 'rtl' ? width : 0, y + n * LINE_HEIGHT + LINE_HEIGHT / 2);
        });
        y += (lineSets[i]?.height ?? 0) + 8;
      });
    }
    if (plain) {
      plain.style.width = `${width}px`;
      const h = layout(joined, width, LINE_HEIGHT).height;
      notes.push(`pre-wrap block: Pretext ${h}px, DOM ${plain.getBoundingClientRect().height}px`);
    }
    notes.push('Heights agree; compare where brackets, digits and Latin words sit at line edges between the DOM and canvas columns.');
    readout.textContent = notes.join('\n');
  };

  if (preview) {
    cols.style.flexWrap = 'nowrap';
    cols.style.gap = '6px';
    root.append(cols);
    el.append(root);
    let raf = 0;
    let last = 0;
    const tick = (t: number): void => {
      const w = 4 * Math.round((100 + 20 * Math.sin(t / 1100)) / 4);
      if (w !== last) {
        last = w;
        render(w);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '100';
  slider.max = '420';
  slider.value = '260';
  const label = document.createElement('span');
  label.textContent = `fonts: ${FAMILY}`;
  controls.append(slider, label);
  root.append(controls, readout, cols);
  el.append(root);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  render(Number(slider.value));
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

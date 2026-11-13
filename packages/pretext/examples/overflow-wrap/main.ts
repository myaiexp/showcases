// Compares layout()'s height with the same long token painted with and without overflow-wrap: break-word
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '16px "Inter Variable"';
const LINE_HEIGHT = 22;
const FULL_TEXT =
  'Not found: ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_0123456789_end in the cache.';
const SHORT_TEXT = 'Not found: ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdef.';

interface Panel {
  stage: HTMLElement;
  predicted: HTMLElement;
  para: HTMLElement;
}

function panel(mode: 'break-word' | 'normal', parent: HTMLElement, title: string, text: string, labelled: boolean): Panel {
  const col = document.createElement('div');
  col.className = 'col';
  const h = document.createElement('h4');
  h.textContent = title;
  const stage = document.createElement('div');
  stage.className = 'stage';
  const predicted = document.createElement('div');
  predicted.className = 'predicted';
  const para = document.createElement('p');
  para.className = `para ${mode}`;
  para.style.font = FONT;
  para.style.lineHeight = `${LINE_HEIGHT}px`;
  para.textContent = text;
  stage.append(predicted, para);
  if (labelled) col.append(h);
  col.append(stage);
  parent.append(col);
  return { stage, predicted, para };
}

const mount: Mount = async (el, { preview, signal }) => {
  const TEXT = preview ? SHORT_TEXT : FULL_TEXT;
  await document.fonts.load(FONT, TEXT);
  if (signal.aborted) return () => {};

  let prepared = prepare(TEXT, FONT);
  const root = document.createElement('div');
  root.className = 'root';
  const cols = document.createElement('div');
  cols.className = 'cols';
  const wrapped = panel('break-word', cols, 'overflow-wrap: break-word', TEXT, !preview);
  const plain = panel('normal', cols, 'overflow-wrap: normal (CSS default)', TEXT, !preview);
  const readout = document.createElement('p');
  readout.className = 'readout';

  const render = (width: number): void => {
    // Pretext breaks a word that doesn't fit between graphemes: that's break-word behaviour.
    const { height, lineCount } = layout(prepared, width, LINE_HEIGHT);
    const lines: string[] = [`width ${width}px: layout() says ${lineCount} lines, ${height}px`];
    for (const [p, name] of [[wrapped, 'break-word'], [plain, 'normal']] as const) {
      p.stage.style.width = `${width}px`;
      p.para.style.width = `${width}px`;
      p.predicted.style.width = `${width}px`;
      p.predicted.style.height = `${height}px`;
      const dom = p.para.getBoundingClientRect().height;
      const over = Math.max(0, p.para.scrollWidth - width);
      const agree = dom === height && over === 0;
      lines.push(`${name}: DOM ${dom}px${over ? `, overflows by ${over}px` : ''} ${agree ? '(agrees)' : '(disagrees)'}`);
    }
    readout.textContent = lines.join('\n');
  };

  if (preview) {
    root.append(cols);
    // Two narrow panels sit side by side in the card.
    cols.style.gap = '6px';
    el.append(root);
    let raf = 0;
    let last = 0;
    const tick = (t: number): void => {
      const w = 4 * Math.round((100 + 20 * Math.sin(t / 1000)) / 4);
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
  slider.min = '40';
  slider.max = '420';
  slider.value = '180';
  const editor = document.createElement('textarea');
  editor.rows = 2;
  editor.value = TEXT;
  controls.append(slider, editor);
  root.append(controls, readout, cols);
  el.append(root);
  const onWidth = (): void => render(Number(slider.value));
  const onText = async (): Promise<void> => {
    const text = editor.value;
    await document.fonts.load(FONT, text);
    prepared = prepare(text, FONT);
    wrapped.para.textContent = text;
    plain.para.textContent = text;
    onWidth();
  };
  slider.addEventListener('input', onWidth);
  editor.addEventListener('input', onText);
  onWidth();
  return () => {
    slider.removeEventListener('input', onWidth);
    editor.removeEventListener('input', onText);
  };
};

export default mount;

// Predicts a paragraph's height with prepare() + layout() and checks it against the painted DOM
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

// The font string, line height and width Pretext gets must match the CSS that paints the text.
const FONT_SIZE = 16;
const FONT = `${FONT_SIZE}px "Inter Variable"`;
const LINE_HEIGHT = 24;
const TEXT =
  'Pretext measures this paragraph once, then answers how tall it is at any width with plain arithmetic. AGI 春天到了. بدأت الرحلة 🚀';

const mount: Mount = async (el, { preview, signal }) => {
  // Prepare only once the web font has loaded, passing the text: Inter is split by unicode-range.
  await document.fonts.load(FONT, TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const predicted = document.createElement('div');
  predicted.className = 'predicted';
  const para = document.createElement('p');
  para.className = 'para';
  para.style.font = FONT;
  para.style.lineHeight = `${LINE_HEIGHT}px`;
  stage.append(predicted, para);

  // One-time work: segment and measure the text. Never redo this for a new width.
  let prepared = prepare(TEXT, FONT);
  para.textContent = TEXT;

  const render = (width: number, check: boolean): void => {
    // The hot path: pure arithmetic over cached widths.
    const { height, lineCount } = layout(prepared, width, LINE_HEIGHT);
    para.style.width = `${width}px`;
    predicted.style.width = `${width}px`;
    predicted.style.height = `${height}px`;
    let text = `width ${width}px → ${lineCount} lines, ${height}px tall`;
    // Reading the DOM back is only here to prove the prediction; Pretext never needs it.
    if (check) {
      const actual = para.getBoundingClientRect().height;
      text += actual === height ? ' · DOM agrees' : ` · DOM says ${actual}px`;
    }
    readout.textContent = text;
  };

  if (preview) {
    root.append(stage, readout);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(150 + 90 * (0.5 + 0.5 * Math.sin(t / 900))), false);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '60';
  slider.max = '560';
  slider.value = '320';
  const editor = document.createElement('textarea');
  editor.value = TEXT;
  editor.rows = 3;
  controls.append(slider, editor);
  root.append(controls, readout, stage);
  el.append(root);

  const onWidth = (): void => render(Number(slider.value), true);
  const onText = async (): Promise<void> => {
    const text = editor.value;
    await document.fonts.load(FONT, text);
    // New text is the one case that needs a new prepare().
    prepared = prepare(text, FONT);
    para.textContent = text;
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

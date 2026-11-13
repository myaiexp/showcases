// Matches CSS letter-spacing with prepare()'s { letterSpacing } option, positive and negative
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '16px "Inter Variable"';
const LINE_HEIGHT = 24;
const TEXT =
  'Tracking changes how much room a line of text needs. Tight headlines squeeze letters together, while small capitals and labels are opened up, and every change can move a word onto another line.';

const mount: Mount = async (el, { preview, signal }) => {
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
  // The card shows only the first sentence so it fits 200px.
  const body = preview ? (TEXT.split('. ')[0] ?? TEXT) + '.' : TEXT;
  para.textContent = body;
  stage.append(predicted, para);

  let width = 320;
  // letterSpacing is a prepare() option, so a new spacing means a new prepare(): keep one per value.
  const handles = new Map<number, ReturnType<typeof prepare>>();
  const render = (spacing: number, check: boolean): void => {
    let prepared = handles.get(spacing);
    if (!prepared) {
      prepared = prepare(body, FONT, { letterSpacing: spacing });
      handles.set(spacing, prepared);
    }
    const { height, lineCount } = layout(prepared, width, LINE_HEIGHT);
    // The painted element gets the same value as CSS letter-spacing, in px.
    para.style.letterSpacing = `${spacing}px`;
    para.style.width = `${width}px`;
    predicted.style.width = `${width}px`;
    predicted.style.height = `${height}px`;
    let text = `letter-spacing ${spacing}px → ${lineCount} lines, ${height}px tall`;
    if (check) {
      const actual = para.getBoundingClientRect().height;
      text += actual === height ? ' · DOM agrees' : ` · DOM says ${actual}px`;
    }
    readout.textContent = text;
  };

  if (preview) {
    width = 240;
    root.append(stage, readout);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      // Quarter-pixel steps keep the swept values on a small grid.
      render(Math.round(4 * 2.5 * Math.sin(t / 1200)) / 4 + 0.5, false);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const makeSlider = (min: number, max: number, step: number, value: number): HTMLInputElement => {
    const s = document.createElement('input');
    s.type = 'range';
    s.min = String(min);
    s.max = String(max);
    s.step = String(step);
    s.value = String(value);
    return s;
  };
  const spacing = makeSlider(-2, 8, 0.25, 0);
  const widthSlider = makeSlider(160, 560, 1, width);
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(spacing, widthSlider);
  root.append(controls, readout, stage);
  el.append(root);
  const onInput = (): void => {
    width = Number(widthSlider.value);
    render(Number(spacing.value), true);
  };
  spacing.addEventListener('input', onInput);
  widthSlider.addEventListener('input', onInput);
  onInput();
  return () => {
    spacing.removeEventListener('input', onInput);
    widthSlider.removeEventListener('input', onInput);
  };
};

export default mount;

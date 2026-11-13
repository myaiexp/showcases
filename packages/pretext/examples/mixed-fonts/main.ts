// Body, bold and code runs in one paragraph; wrapped code spans are padded on every line
import '@fontsource-variable/inter';
import { materializeRichInlineLineRange, prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { paintLine, toItem } from './paint.ts';
import { BODY, FONTS, LINE_HEIGHT, PIECES } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, 'Aa(){}')));
  if (signal.aborted) return () => {};

  // Each run keeps its own font; the code runs add their padding as extraWidth but may still wrap.
  const pieces = preview ? PIECES.slice(0, 5) : PIECES; // the card shows just the first sentence
  const prepared = prepareRichInline(pieces.map(toItem));

  const root = document.createElement('div');
  root.className = 'root';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const readout = document.createElement('p');
  readout.className = 'readout';
  stage.style.font = BODY;
  stage.style.lineHeight = `${LINE_HEIGHT}px`;

  const render = (width: number): void => {
    const lines: RichInlineLine[] = [];
    walkRichInlineLineRanges(prepared, width, (range) => lines.push(materializeRichInlineLineRange(prepared, range)));
    stage.style.width = `${width}px`;
    stage.replaceChildren(...lines.map((line) => paintLine(line, pieces, LINE_HEIGHT)));
    // A code span that wraps shows up as several fragments of the same item, each with its own padding.
    const codeFragments = lines.flatMap((l) => l.fragments).filter((f) => pieces[f.itemIndex]?.cls === 'code').length;
    readout.textContent = `width ${width}px → ${lines.length} lines, ${codeFragments} code fragments for 2 code spans`;
  };

  if (preview) {
    root.append(stage);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(150 + 90 * (0.5 + 0.5 * Math.sin(t / 1200))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '110';
  slider.max = '560';
  slider.value = '260';
  root.append(slider, readout, stage);
  el.append(root);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

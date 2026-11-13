// Inline boxes ({ width }): custom emoji and pictures; each line is as tall as its tallest box
import '@fontsource-variable/inter';
import { materializeRichInlineLineRange, prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { isBox, paintLine, toItem } from './paint.ts';
import { BODY, LINE_HEIGHT, PIECES } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(BODY, 'Aa');
  if (signal.aborted) return () => {};

  // Text runs are items with a font; each box is just { width }.
  const prepared = prepareRichInline(PIECES.map(toItem));

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
    // Heights are ours: a line is the paragraph's line height or its tallest box, whichever is taller.
    const heights = lines.map((line) =>
      line.fragments.reduce((h, f) => {
        const piece = PIECES[f.itemIndex];
        return piece && isBox(piece) ? Math.max(h, piece.height) : h;
      }, LINE_HEIGHT),
    );
    stage.style.width = `${width}px`;
    stage.replaceChildren(...lines.map((line) => paintLine(line, PIECES, LINE_HEIGHT)));
    const total = heights.reduce((a, b) => a + b, 0);
    readout.textContent = `width ${width}px → line heights ${heights.join(' + ')} = ${total}px`;
    stage.style.height = `${total}px`;
  };

  if (preview) {
    root.append(stage);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(150 + 90 * (0.5 + 0.5 * Math.sin(t / 1300))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '130';
  slider.max = '560';
  slider.value = '300';
  root.append(slider, readout, stage);
  el.append(root);
  const onInput = (): void => {
    render(Number(slider.value));
    // Check once against the DOM: the stacked rows take exactly the height we summed.
    const rows = [...stage.children].reduce((sum, row) => sum + row.getBoundingClientRect().height, 0);
    readout.textContent += rows === stage.getBoundingClientRect().height ? ' · DOM agrees' : ` · DOM rows ${rows}px`;
  };
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

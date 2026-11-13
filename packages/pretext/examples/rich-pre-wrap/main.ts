// Styled editor runs in white-space: pre-wrap; fragments keep their spaces and tabs, with no gaps
import { materializeRichInlineLineRange, prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { paintFlow, paintLine, toItem } from './paint.ts';
import { FONTS, LINE_HEIGHT, PIECES, REGULAR } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, 'const {}')));
  if (signal.aborted) return () => {};

  // The second argument is the paragraph's white-space: every item keeps its spaces, tabs and newlines.
  const pieces = preview ? PIECES.slice(0, 13) : PIECES; // the card shows the first lines only
  const prepared = prepareRichInline(pieces.map(toItem), { whiteSpace: 'pre-wrap' });

  const root = document.createElement('div');
  root.className = 'root';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const readout = document.createElement('p');
  readout.className = 'readout';
  stage.style.font = REGULAR;
  stage.style.lineHeight = `${LINE_HEIGHT}px`;

  const render = (width: number): number => {
    const lines: RichInlineLine[] = [];
    walkRichInlineLineRanges(prepared, width, (range) => lines.push(materializeRichInlineLineRange(prepared, range)));
    stage.style.width = `${width}px`;
    stage.replaceChildren(...lines.map((line) => paintLine(line, pieces, LINE_HEIGHT)));
    return lines.length;
  };

  if (preview) {
    root.append(stage);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(200 + 50 * (0.5 + 0.5 * Math.sin(t / 1300))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  // The same runs in a real pre-wrap paragraph, to check the line count.
  const flow = paintFlow(PIECES);
  flow.style.font = REGULAR;
  flow.style.lineHeight = `${LINE_HEIGHT}px`;
  flow.style.whiteSpace = 'pre-wrap';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '90';
  slider.max = '520';
  slider.value = '300';
  const cols = document.createElement('div');
  cols.className = 'cols';
  const left = document.createElement('div');
  const right = document.createElement('div');
  left.append(Object.assign(document.createElement('h4'), { textContent: 'Pretext lines, white-space: pre' }), stage);
  right.append(Object.assign(document.createElement('h4'), { textContent: 'Browser, white-space: pre-wrap' }), flow);
  cols.append(left, right);
  root.append(slider, readout, cols);
  el.append(root);

  const onInput = (): void => {
    const width = Number(slider.value);
    const count = render(width);
    flow.style.width = `${width}px`;
    const domLines = Math.round(flow.getBoundingClientRect().height / LINE_HEIGHT);
    readout.textContent = `width ${width}px → Pretext ${count} lines, browser ${domLines} lines${count === domLines ? ' · they agree' : ' · they differ'}`;
  };
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

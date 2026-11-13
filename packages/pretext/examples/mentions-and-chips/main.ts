// A paragraph of @mentions and #tag chips: atomic items whose padding is extraWidth
import '@fontsource-variable/inter';
import { materializeRichInlineLineRange, prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { paintFlow, paintLine, toItem } from './paint.ts';
import { BODY, FONTS, LINE_HEIGHT, PIECES } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, 'Aa@#한')));
  if (signal.aborted) return () => {};

  // One-time work: every run becomes an item; chips are `break: 'never'` with their padding as extraWidth.
  const prepared = prepareRichInline(PIECES.map(toItem));

  const root = document.createElement('div');
  root.className = 'root';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const readout = document.createElement('p');
  readout.className = 'readout';
  stage.style.font = BODY;
  stage.style.lineHeight = `${LINE_HEIGHT}px`;

  // The hot path: walk the line ranges at this width, materialize each one's text, paint a line per element.
  const render = (width: number): number => {
    const lines: RichInlineLine[] = [];
    walkRichInlineLineRanges(prepared, width, (range) => lines.push(materializeRichInlineLineRange(prepared, range)));
    stage.style.width = `${width}px`;
    stage.replaceChildren(...lines.map((line) => paintLine(line, PIECES, LINE_HEIGHT)));
    return lines.length;
  };

  if (preview) {
    root.append(stage);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(150 + 90 * (0.5 + 0.5 * Math.sin(t / 1100))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  // Full view: the same runs again, wrapped by the browser itself, to compare line counts.
  const flow = paintFlow(PIECES);
  flow.style.font = BODY;
  flow.style.lineHeight = `${LINE_HEIGHT}px`;
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '120';
  slider.max = '560';
  slider.value = '300';
  const cols = document.createElement('div');
  cols.className = 'cols';
  const left = document.createElement('div');
  const right = document.createElement('div');
  left.append(Object.assign(document.createElement('h4'), { textContent: 'Pretext lines' }), stage);
  right.append(Object.assign(document.createElement('h4'), { textContent: 'Browser flow' }), flow);
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

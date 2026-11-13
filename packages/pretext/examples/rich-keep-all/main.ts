// The same Korean rich-inline message prepared by default and with wordBreak: 'keep-all', side by side
import '@fontsource-variable/inter';
import { materializeRichInlineLineRange, prepareRichInline, walkRichInlineLineRanges } from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { paintLine, toItem } from './paint.ts';
import { BODY, FONTS, LINE_HEIGHT, PIECES, SAMPLE } from './data.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, SAMPLE)));
  if (signal.aborted) return () => {};

  // Same items, two paragraphs: keep-all breaks Korean only at spaces, as CSS word-break: keep-all does.
  const items = PIECES.map(toItem);
  const normal = prepareRichInline(items);
  const keepAll = prepareRichInline(items, { wordBreak: 'keep-all' });

  const root = document.createElement('div');
  root.className = 'root';
  const mk = (title: string): { col: HTMLElement; stage: HTMLElement; count: HTMLElement } => {
    const col = document.createElement('div');
    col.className = 'col';
    const h = document.createElement('h4');
    h.textContent = title;
    const stage = document.createElement('div');
    stage.className = 'stage';
    stage.style.font = BODY;
    stage.style.lineHeight = `${LINE_HEIGHT}px`;
    const count = document.createElement('p');
    count.className = 'readout';
    col.append(h, stage, count);
    return { col, stage, count };
  };
  const a = mk('default');
  const b = mk("wordBreak: 'keep-all'");
  root.append(a.col, b.col);

  const paint = (target: ReturnType<typeof mk>, prepared: ReturnType<typeof prepareRichInline>, width: number): void => {
    const lines: RichInlineLine[] = [];
    walkRichInlineLineRanges(prepared, width, (range) => lines.push(materializeRichInlineLineRange(prepared, range)));
    target.stage.style.width = `${width}px`;
    target.stage.replaceChildren(...lines.map((line) => paintLine(line, PIECES, LINE_HEIGHT)));
    target.count.textContent = `${lines.length} lines`;
  };
  const render = (width: number): void => {
    paint(a, normal, width);
    paint(b, keepAll, width);
  };

  if (preview) {
    root.classList.add('compact');
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(95 + 25 * (0.5 + 0.5 * Math.sin(t / 1200))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '90';
  slider.max = '400';
  slider.value = '180';
  root.prepend(slider);
  el.append(root);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

// Chat bubbles shrink-wrapped to their widest rich-inline line with measureRichInlineStats
import '@fontsource-variable/inter';
import {
  materializeRichInlineLineRange,
  measureRichInlineStats,
  prepareRichInline,
  walkRichInlineLineRanges,
} from '@chenglou/pretext/rich-inline';
import type { RichInlineLine } from '@chenglou/pretext/rich-inline';
import type { Mount } from '@/types.ts';
import { paintLine, toItem } from './paint.ts';
import { BODY, FONTS, LINE_HEIGHT, MESSAGES } from './data.ts';
import './style.css';

const PAD_X = 12;

const mount: Mount = async (el, { preview, signal }) => {
  await Promise.all(FONTS.map((f) => document.fonts.load(f, 'Aa@')));
  if (signal.aborted) return () => {};

  // Prepare every message once; resizing the chat never prepares again.
  const messages = (preview ? MESSAGES.slice(0, 3) : MESSAGES).map((m) => ({ ...m, prepared: prepareRichInline(m.runs.map(toItem)), bubble: document.createElement('div') }));

  const root = document.createElement('div');
  root.className = 'root';
  const chat = document.createElement('div');
  chat.className = 'chat';
  chat.style.font = BODY;
  chat.style.lineHeight = `${LINE_HEIGHT}px`;
  const readout = document.createElement('p');
  readout.className = 'readout';
  for (const m of messages) {
    m.bubble.className = `bubble ${m.mine ? 'mine' : 'theirs'}`;
    chat.append(m.bubble);
  }

  const render = (chatWidth: number): void => {
    // The widest a bubble may be: the chat's width minus the bubble's padding, and a little air.
    const cap = Math.floor(chatWidth * 0.85) - 2 * PAD_X;
    chat.style.width = `${chatWidth}px`;
    const inner: number[] = [];
    for (const m of messages) {
      // The widest line at the cap, rounded up so the bubble never clips it.
      const { maxLineWidth } = measureRichInlineStats(m.prepared, cap);
      const width = Math.min(cap, Math.ceil(maxLineWidth));
      inner.push(width);
      const lines: RichInlineLine[] = [];
      walkRichInlineLineRanges(m.prepared, width, (range) => lines.push(materializeRichInlineLineRange(m.prepared, range)));
      m.bubble.style.width = `${width}px`;
      m.bubble.replaceChildren(...lines.map((line) => paintLine(line, m.runs, LINE_HEIGHT)));
    }
    readout.textContent = `chat ${chatWidth}px, cap ${cap}px → bubble text widths ${inner.join(', ')}px`;
  };

  if (preview) {
    root.append(chat);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(190 + 60 * (0.5 + 0.5 * Math.sin(t / 1400))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '160';
  slider.max = '620';
  slider.value = '380';
  root.append(slider, readout, chat);
  el.append(root);
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

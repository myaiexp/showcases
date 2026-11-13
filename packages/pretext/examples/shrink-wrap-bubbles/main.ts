// Shrink-wraps chat bubbles to their widest line with walkLineRanges(), against a naive full-width bubble
import '@fontsource-variable/inter';
import { prepare, walkLineRanges } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '15px "Inter Variable"';
const LINE_HEIGHT = 21;
const PAD_X = 12;
const MESSAGES = [
  'Are we still on for lunch?',
  'Yes! I booked the table by the window for twelve thirty, so we can watch the harbour while we eat.',
  'Perfect. Can you bring the printed photos from the trip? I want to show everyone.',
  'Sure thing.',
  'Also, the restaurant said they can do a vegetarian tasting menu if anyone needs it, just tell them a day ahead.',
  'On my way 🚀',
];

// The width a bubble's text needs: the widest line at maxWidth, rounded up, capped at maxWidth.
const shrinkWrap = (text: string, maxWidth: number): number => {
  let maxW = 0;
  walkLineRanges(prepare(text, FONT), maxWidth, (line) => {
    if (line.width > maxW) maxW = line.width;
  });
  return Math.min(Math.ceil(maxW), maxWidth);
};

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, MESSAGES.join(' '));
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const chat = document.createElement('div');
  chat.className = 'chat';
  const readout = document.createElement('p');
  readout.className = 'readout';
  chat.style.setProperty('--font', FONT);
  chat.style.setProperty('--lh', `${LINE_HEIGHT}px`);
  chat.style.setProperty('--pad-x', `${PAD_X}px`);

  const render = (maxWidth: number, messages: string[]): void => {
    chat.replaceChildren();
    chat.style.width = `${maxWidth + PAD_X * 2}px`;
    let wasted = 0;
    for (const text of messages) {
      const width = shrinkWrap(text, maxWidth);
      wasted += maxWidth - width;
      const row = document.createElement('div');
      row.className = 'row';
      // Naive bubble: always as wide as maxWidth. The shaded strip is the space it wastes.
      const naive = document.createElement('div');
      naive.className = 'naive';
      const waste = document.createElement('div');
      waste.className = 'waste';
      waste.style.width = `${maxWidth - width}px`;
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.width = `${width}px`;
      bubble.textContent = text;
      naive.append(bubble, waste);
      row.append(naive);
      chat.append(row);
    }
    readout.textContent = `maxWidth ${maxWidth}px · wasted by naive bubbles: ${Math.round(wasted)}px of width in total`;
  };

  if (preview) {
    root.append(chat);
    el.append(root);
    let step = 0;
    const show = (): void => {
      const start = (step * 2) % MESSAGES.length;
      render(230, MESSAGES.slice(start, start + 2));
      step++;
    };
    show();
    const id = window.setInterval(show, 2200);
    return () => window.clearInterval(id);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '420';
  slider.value = '300';
  root.append(slider, readout, chat);
  el.append(root);
  const onInput = (): void => render(Number(slider.value), MESSAGES);
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

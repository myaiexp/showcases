// Masonry: text cards go into the shortest column using heights from layout(), never measured in the DOM
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { CARDS } from './data.ts';
import './style.css';

const FONT = '13px "Inter Variable"';
const LINE_HEIGHT = 18;
const PAD = 10;
const GAP = 8;

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, CARDS.join(' '));
  if (signal.aborted) return () => {};

  const minCol = preview ? 100 : 150;
  const prepared = CARDS.map((text) => prepare(text, FONT));

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const board = document.createElement('div');
  board.className = 'board';
  const cards = CARDS.map((text, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.font = FONT;
    card.style.lineHeight = `${LINE_HEIGHT}px`;
    card.style.padding = `${PAD}px`;
    card.style.setProperty('--hue', String((i * 47) % 360));
    card.textContent = text;
    board.append(card);
    return card;
  });

  const render = (width: number): void => {
    const cols = Math.max(1, Math.floor((width + GAP) / (minCol + GAP)));
    const colWidth = Math.floor((width - GAP * (cols - 1)) / cols);
    const textWidth = colWidth - 2 * PAD;
    const colHeights = new Array<number>(cols).fill(0);
    prepared.forEach((p, i) => {
      // Shortest column first; the card's height is pure arithmetic from layout().
      let col = 0;
      for (let c = 1; c < cols; c++) if ((colHeights[c] ?? 0) < (colHeights[col] ?? 0)) col = c;
      const height = layout(p, textWidth, LINE_HEIGHT).height + 2 * PAD;
      const card = cards[i]!;
      card.style.width = `${colWidth}px`;
      card.style.height = `${height}px`;
      card.style.transform = `translate(${col * (colWidth + GAP)}px, ${colHeights[col] ?? 0}px)`;
      colHeights[col] = (colHeights[col] ?? 0) + height + GAP;
    });
    const tallest = Math.max(...colHeights) - GAP;
    const shortest = Math.min(...colHeights) - GAP;
    board.style.width = `${width}px`;
    board.style.height = `${tallest}px`;
    readout.textContent = `${width}px → ${cols} columns of ${colWidth}px · tallest ${tallest}px, shortest ${shortest}px`;
  };

  if (preview) {
    root.classList.add('preview');
    root.append(board);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(150 + 120 * (0.5 + 0.5 * Math.sin(t / 1500))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '150';
  slider.max = '760';
  slider.value = '520';
  const onInput = (): void => render(Number(slider.value));
  slider.addEventListener('input', onInput);
  root.append(slider, readout, board);
  el.append(root);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;

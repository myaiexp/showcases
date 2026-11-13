// gsap.utils.shuffle() reorders an array in place; a staggered tween slides the cards to their new slots
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const COUNT = 8;

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const CARD = preview ? 26 : 44;
  const STEP = CARD + (preview ? 4 : 8);

  const table = document.createElement('div');
  table.className = 'table';
  table.style.width = `${STEP * COUNT}px`;
  table.style.height = `${CARD * 1.4}px`;
  const labels = Array.from({ length: COUNT }, (_, i) => i + 1);
  // the deck: slot i is deck[i]; shuffling the array decides which card goes where
  const deck = labels.map((n) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.textContent = String(n);
    c.dataset.n = String(n);
    c.style.width = `${CARD}px`;
    c.style.height = `${CARD * 1.4}px`;
    c.style.background = `hsl(${n * 40} 70% 60%)`;
    table.append(c);
    return c;
  });
  const readout = document.createElement('p');
  readout.className = 'readout';
  root.append(table);
  if (!preview) root.append(readout);
  el.append(root);

  const ctx = gsap.context(() => {
    gsap.set(deck, { x: (i: number) => i * STEP });
  }, el);

  const shuffle = (): void => {
    const returned = gsap.utils.shuffle(deck); // shuffles in place and returns the same array
    // function-based value: GSAP calls it once per card with the card's index in `deck`
    gsap.to(deck, { x: (i: number) => i * STEP, duration: 0.8, ease: 'power3.inOut', stagger: 0.06, overwrite: true });
    readout.textContent = `order: ${deck.map((c) => c.dataset.n).join(' ')}   returned === deck: ${returned === deck}`;
  };

  let timer = 0;
  let first = 0;
  if (preview) {
    first = window.setTimeout(shuffle, 300);
    timer = window.setInterval(shuffle, 2000);
  }
  else {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'shuffle(deck)';
    btn.addEventListener('click', shuffle);
    root.append(btn);
    readout.textContent = 'order: 1 2 3 4 5 6 7 8';
  }

  return () => {
    window.clearInterval(timer);
    window.clearTimeout(first);
    gsap.killTweensOf(deck);
    ctx.revert();
  };
};

export default mount;

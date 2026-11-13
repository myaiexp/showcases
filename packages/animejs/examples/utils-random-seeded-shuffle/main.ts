// Two fields scattered by utils.random and createSeededRandom, plus a row reordered with shuffle
import { animate, stagger, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const COUNT = 10;

const field = (title: string): { box: HTMLElement; dots: HTMLElement[] } => {
  const box = document.createElement('div');
  box.className = 'field';
  const cap = document.createElement('span');
  cap.className = 'cap';
  cap.textContent = title;
  box.append(cap);
  const dots: HTMLElement[] = [];
  for (let i = 0; i < COUNT; i++) {
    const d = document.createElement('div');
    d.className = 'dot';
    dots.push(d);
    box.append(d);
  }
  return { box, dots };
};

const mount: Mount = (el, { preview }) => {
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const free = field('random()');
  const seeded = field('createSeededRandom(12345)');
  wrap.append(free.box, seeded.box);
  el.append(wrap);

  const strip = document.createElement('div');
  strip.className = 'strip';
  const tiles: HTMLElement[] = [];
  for (const ch of 'ABCDEF') {
    const t = document.createElement('div');
    t.className = 'tile';
    t.textContent = ch;
    tiles.push(t);
    strip.append(t);
  }
  if (!preview) el.append(strip);

  let anims: { revert(): unknown }[] = [];
  let seededRandom = utils.createSeededRandom(12345);

  const scatter = (): void => {
    anims.forEach((a) => a.revert());
    // Creating a new seeded generator restarts its suite, so the layout repeats exactly.
    seededRandom = utils.createSeededRandom(12345);
    const spread = (rnd: (min: number, max: number, dec?: number) => number) => ({
      x: () => rnd(0, 100, 1) + '%',
      y: () => rnd(0, 100, 1) + '%',
      scale: () => rnd(0.5, 1.5, 2),
    });
    anims = [
      animate(free.dots, { ...spread(utils.random), duration: 700, delay: stagger(30), ease: 'outExpo' }),
      animate(seeded.dots, { ...spread(seededRandom), duration: 700, delay: stagger(30), ease: 'outExpo' }),
    ];
  };

  const x = stagger('2.6rem');
  const reorder = (): void => {
    const order = utils.shuffle(tiles.slice());
    anims.push(animate(order, { x, duration: 500, ease: 'outQuad' }));
  };
  const paint = (): void => {
    // randomPick returns one element of a string or array.
    utils.set(tiles, { color: () => utils.randomPick(['#ff6b6b', '#ffa94d', '#ffd43b']) as string });
  };

  utils.set(free.dots, { x: '50%', y: '50%' });
  utils.set(seeded.dots, { x: '50%', y: '50%' });
  utils.set(tiles, { x });
  scatter();

  let timer = 0;
  if (preview) {
    timer = window.setInterval(scatter, 2600);
  } else {
    const bar = document.createElement('div');
    bar.className = 'controls';
    const btn = (label: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      bar.append(b);
    };
    btn('Scatter again', scatter);
    btn('shuffle() the row', reorder);
    btn('randomPick() colors', paint);
    el.append(bar);
  }

  return () => {
    window.clearInterval(timer);
    anims.forEach((a) => a.revert());
  };
};

export default mount;

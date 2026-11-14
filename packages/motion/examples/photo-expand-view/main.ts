// A thumbnail that morphs into a full detail view with animateView's shared elements
import type { Mount } from '@/types.ts';
import { motionFrame } from '../../shared/frame.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const PHOTOS = [
  ['Lake at dawn', 'linear-gradient(160deg,#f6d365,#fda085 45%,#3a6186)'],
  ['Pine forest', 'linear-gradient(160deg,#134e5e,#71b280)'],
  ['Northern lights', 'linear-gradient(160deg,#0f2027,#2c5364 50%,#56d39c)'],
  ['Harbour', 'linear-gradient(160deg,#355c7d,#6c5b7b 50%,#c06c84)'],
] as const;

// The iframe's own page: animateView snapshots a whole document, so it gets its own.
const CSS = `
body{display:grid;place-items:center;height:100vh;overflow:hidden}
.app{width:min(100vw - 16px,340px)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.tile{aspect-ratio:4/3;border-radius:10px;border:0;padding:0;cursor:pointer}
.detail{display:flex;flex-direction:column;gap:8px}
.hero{aspect-ratio:16/10;border-radius:14px}
.detail h2{margin:0;font-size:16px}
.detail p{margin:0;font-size:12px;color:var(--fg-2)}
`;

const mount: Mount = async (el, { preview, signal }) => {
  const host = document.createElement('div');
  host.className = 'host';
  el.append(host);
  if (!preview) hint(el, 'Tap a photo. It grows into the detail view as one shape, the caption fades in, and Back reverses it.');

  const { doc, Motion } = await motionFrame(host, { css: CSS, signal });
  const { animateView } = Motion;
  const app = doc.createElement('div');
  app.className = 'app';
  doc.body.append(app);

  const showGrid = (): void => {
    app.replaceChildren();
    const grid = doc.createElement('div');
    grid.className = 'grid';
    PHOTOS.forEach(([name, bg], i) => {
      const tile = doc.createElement('button');
      tile.className = 'tile';
      tile.dataset.i = String(i);
      tile.style.background = bg;
      tile.setAttribute('aria-label', name);
      tile.addEventListener('click', () => open(i));
      grid.append(tile);
    });
    app.append(grid);
  };

  const showDetail = (i: number): void => {
    const [name, bg] = PHOTOS[i]!;
    app.replaceChildren();
    const detail = doc.createElement('div');
    detail.className = 'detail';
    const hero = doc.createElement('div');
    hero.className = 'hero';
    hero.style.background = bg;
    const h = doc.createElement('h2');
    h.textContent = name;
    const p = doc.createElement('p');
    p.textContent = 'Shot on a quiet morning. Tap back to return to the grid.';
    const back = doc.createElement('button');
    back.textContent = '← Back';
    back.addEventListener('click', () => close(i));
    detail.append(hero, h, p, back);
    app.append(detail);
  };

  let openIndex = -1;
  // add(before, after) gives the tile and the hero one shared view-transition-name, so the
  // first morphs into the second. The second target is a selector, re-run after update().
  const open = (i: number): void => {
    openIndex = i;
    const tile = app.querySelector(`.tile[data-i="${i}"]`);
    if (!tile) return;
    animateView(() => showDetail(i), { type: 'spring', visualDuration: 0.45, bounce: 0.15 })
      .add(tile, '.hero')
      .add('.detail h2, .detail p, .detail button')
      .enter({ opacity: [0, 1] }, { delay: 0.15, duration: 0.25 });
  };
  const close = (i: number): void => {
    openIndex = -1;
    animateView(() => showGrid(), { type: 'spring', visualDuration: 0.4, bounce: 0.1 })
      .add('.hero', `.tile[data-i="${i}"]`)
      .add('.detail h2, .detail p, .detail button')
      .exit({ opacity: 0 }, { duration: 0.15 });
  };

  showGrid();

  // A card has no pointer: open a photo, close it, move on to the next one.
  let timer = 0;
  if (preview) {
    let n = 0;
    const tick = (): void => {
      if (openIndex < 0) open(n++ % PHOTOS.length);
      else close(openIndex);
    };
    timer = window.setInterval(tick, 1800);
  }

  return () => {
    window.clearInterval(timer);
  };
};

export default mount;

// A cheat sheet of keys walked through with showNext, showPrevious and show(index)
import tippy, { createSingleton } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const KEYS = [
  { key: 'C', tip: 'Copy the selection' },
  { key: 'V', tip: 'Paste it here' },
  { key: 'X', tip: 'Cut the selection' },
  { key: 'Z', tip: 'Undo the last step' },
  { key: 'S', tip: 'Save your work' },
  { key: 'F', tip: 'Find on this page' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Use Previous and Next (they wrap around) or the numbers.' });

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = 'Press Ctrl + ...';
  const keys = document.createElement('div');
  keys.className = 'keys';
  const caps = KEYS.map((k) => {
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = k.key;
    keys.append(cap);
    return cap;
  });
  const nav = document.createElement('div');
  nav.className = 'nav';
  const prev = document.createElement('button');
  prev.className = 'btn';
  prev.textContent = '◀ Previous';
  const next = document.createElement('button');
  next.className = 'btn btn-primary';
  next.textContent = 'Next ▶';
  nav.append(prev, next);
  stage.root.append(title, keys, nav);

  if (!stage.preview) {
    // Full view only: number buttons that jump straight to a key.
    const row = document.createElement('div');
    row.className = 'nav';
    KEYS.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'btn jump';
      b.textContent = String(i + 1);
      b.addEventListener('click', () => go(i, () => singleton.show(i)));
      row.append(b);
    });
    nav.after(row);
  }

  const instances = caps.map((cap, i) => stage.own(tippy(cap, { content: KEYS[i]!.tip })));
  // Which key is lit: -1 when no tip is showing.
  let index = -1;
  const light = (): void => caps.forEach((c, i) => c.classList.toggle('on', i === index));
  caps.forEach((cap, i) =>
    cap.addEventListener('mouseenter', () => {
      index = i;
      light();
    }),
  );
  const singleton = stage.own(
    createSingleton(instances, {
      placement: 'top',
      delay: [0, 0],
      moveTransition: 'transform 0.3s ease-out',
      // Clicking Next / Previous is a click outside the keys, which would hide the tip.
      hideOnClick: false,
      appendTo: stage.root,
      onHidden() {
        index = -1;
        light();
      },
    }),
  );

  const n = KEYS.length;
  const go = (to: number, call: () => void): void => {
    call();
    index = to;
    light();
  };
  const goNext = (): void => go(index < 0 ? 0 : (index + 1) % n, () => singleton.showNext());
  const goPrev = (): void => go(index < 0 ? n - 1 : (index - 1 + n) % n, () => singleton.showPrevious());
  next.addEventListener('click', goNext);
  prev.addEventListener('click', goPrev);

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.moveTo(next, 600);
      for (let i = 0; i < 3; i++) {
        await stage.ghost.click(next, 300);
        await wait(1000);
      }
      await stage.ghost.click(prev, 500);
      await wait(1000);
      await stage.ghost.click(prev, 300);
      await wait(1000);
      singleton.hide();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;

// Stickers you drag around a photo frame: drag() with an element as constraints and elastic edges
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const STICKERS = ['WOW', '★', 'SUMMER'] as const;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = '<div class="frame"><div class="photo"></div></div>';
  const frame = el.querySelector<HTMLElement>('.frame')!;
  const stickers = STICKERS.map((text, i) => {
    const s = document.createElement('div');
    s.className = `sticker s${i}`;
    s.textContent = text;
    frame.append(s);
    return s;
  });

  let stops: VoidFunction[] = [];
  // constraints: an element keeps each sticker inside the frame's box; elastic lets it stretch past.
  const arm = (elastic: number): void => {
    for (const stop of stops) stop();
    stops = stickers.map((s) => drag(s, { constraints: frame, elastic }));
  };

  const scope = scopeMotion(el, () => arm(0.35));

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Drag a sticker past the frame edge: it stretches, then springs back inside. Try elastic 0 for a hard wall, 1 for no resistance.');
    p = panel(el);
    p.slider('elastic', { min: 0, max: 1, step: 0.05, value: 0.35 }, (v) => scope.run(() => arm(v)));
    p.button('Reset', () => scope.run(() => animate(stickers, { x: 0, y: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.4 })));
  } else {
    // Pull a sticker past the right edge, then let go: it springs back.
    loopGesture(el, signal, async (g) => {
      const s = stickers[0]!;
      const from = at(el, s);
      await g.drag(s, from, { x: from.x + 150, y: from.y + 20 }, 0.6);
      await g.wait(0.9);
      await scope.run(() => animate(s, { x: 0, y: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.4 }));
    }, 0.8);
  }

  return () => {
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

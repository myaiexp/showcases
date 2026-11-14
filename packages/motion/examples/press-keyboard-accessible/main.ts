// Quick-setting toggles built on press(): they work with a pointer and with Tab + Enter
import { animate, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const NAMES = ['Wi-Fi', 'Bluetooth', 'Dark mode', 'Alerts'];

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="tiles${preview ? '' : ' big'}"></div><p class="via">Press a tile</p>`;
  const tiles = el.querySelector<HTMLElement>('.tiles')!;
  const via = el.querySelector<HTMLElement>('.via')!;
  const els = NAMES.map((n, i) => {
    const t = document.createElement('div');
    t.className = 'tile';
    t.textContent = n;
    t.dataset.on = String(i % 2 === 0);
    tiles.append(t);
    return t;
  });
  if (!preview) hint(el, 'Click a tile, or press Tab to focus one and Enter to toggle it. press() added the focus and keyboard handling itself.');

  const scope = scopeMotion(el, () => {
    press(els, (tile, startEvent) => {
      animate(tile, { scale: 0.92 }, { duration: 0.1 });
      // Keyboard presses arrive as a key event; pointer presses as a pointer event.
      const source = startEvent.type.startsWith('key') ? 'keyboard' : 'pointer';
      return (_e, info) => {
        animate(tile, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
        if (!info.success) return;
        (tile as HTMLElement).dataset.on = String((tile as HTMLElement).dataset.on !== 'true');
        via.textContent = `${tile.textContent} toggled by ${source}`;
      };
    });
  });

  if (preview) {
    let i = 0;
    loopGesture(el, signal, async (g) => {
      const t = els[i++ % els.length]!;
      await g.tap(t, at(el, t), 0.15);
      await g.wait(0.7);
    }, 0.2);
  }

  return () => scope.cancel();
};

export default mount;

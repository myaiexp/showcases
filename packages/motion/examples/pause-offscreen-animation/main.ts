// A shelf of looping stickers: each loop starts when its tile enters view and stops in the leave callback
import { animate, inView, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const COUNT = 18;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<p class="count"></p><div class="shelf"></div>';
  const shelf = el.querySelector<HTMLElement>('.shelf')!;
  shelf.classList.toggle('full', !preview);
  const count = el.querySelector<HTMLElement>('.count')!;
  for (let i = 0; i < (preview ? 8 : COUNT); i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.innerHTML = '<span class="shape"></span><span class="dot"></span>';
    tile.querySelector<HTMLElement>('.shape')!.style.background = `hsl(${i * 47} 70% 62%)`;
    shelf.append(tile);
  }
  if (!preview) hint(el, 'Scroll the shelf. A green dot marks a sticker whose loop is running; scrolling it out of view stops it where it is.');

  let running = 0;
  const show = (): void => { count.textContent = `${running} of ${shelf.children.length} animating`; };

  const scope = scopeMotion(el, ({ bind }) => {
    show();
    inView('.tile', bind((tile: Element) => {
      const shape = tile.querySelector<HTMLElement>('.shape')!;
      const loop = animate(shape, { rotate: [0, 180, 360], scale: [1, 1.5, 1], borderRadius: ['8px', '50%', '8px'] }, { duration: 1.6, repeat: Infinity, ease: 'easeInOut' });
      tile.classList.add('on');
      running++;
      show();
      // The leave callback: runs when the tile scrolls out of the shelf's viewport.
      return () => {
        loop.stop();
        tile.classList.remove('on');
        running--;
        show();
      };
    }), { root: shelf, amount: 0.6 });
    if (preview) autoScroll(shelf, { duration: 4 });
  });
  return () => scope.cancel();
};

export default mount;

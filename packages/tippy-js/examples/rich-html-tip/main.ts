// A product grid whose tips are HTML strings: bold price, stars, green stock
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PRODUCTS } from './data.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover a product.' });

  const grid = document.createElement('div');
  grid.className = 'grid';
  const tiles = PRODUCTS.map((p, i) => {
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.style.background = p.tint;
    tile.textContent = p.emoji;
    tile.dataset.index = String(i);
    grid.append(tile);
    return tile;
  });
  stage.root.append(grid);

  // The content is a string with tags in it, so allowHTML must be on.
  stage.own(
    tippy(tiles, {
      content: (ref) => PRODUCTS[Number(ref.getAttribute('data-index'))]!.tip,
      allowHTML: true,
      placement: 'bottom',
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const tile of tiles) {
        await stage.ghost.hover(tile, 600);
        await wait(1300);
      }
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 240, y: 160 }, 600);
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

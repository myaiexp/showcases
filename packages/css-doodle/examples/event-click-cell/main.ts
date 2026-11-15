// Click:cell reports the clicked cell's column, row and element
import type { Mount } from '@/types.ts';
import type { CSSDoodle } from '../../shared/types.ts';
import { createStage } from '../../shared/stage.ts';

interface CellClick {
  x: number;
  y: number;
  z: number;
  element: HTMLElement;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click cells to paint them.' });
  const doodle: CSSDoodle = stage.doodle(`
    @grid: 8 / 100% / #1b1b1b _2px;
    background: #3d3d3d;
    transition: background .3s;
  `);

  doodle.addEventListener('click:cell', (e) => {
    const { x, y, element } = (e as CustomEvent<CellClick>).detail;
    element.style.background = `hsl(${(x + y) * 22} 75% 60%)`;
    stage.say(`click:cell → column ${x}, row ${y}`);
  });

  if (ctx.preview) {
    // No pointer in a card: click a random cell element, as a real click would.
    stage.every(450, () => {
      const cells = doodle.shadowRoot!.querySelectorAll<HTMLElement>('cell');
      const cell = cells[Math.floor(Math.random() * cells.length)];
      if (cell?.style.background) cell.style.background = '';
      else cell?.click();
    });
  }
  return () => stage.dispose();
};

export default mount;

// A 20 x 25 seat map with one delegate and a counter of the tips actually created
import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const COLS = 20;
const ROWS = 25;
const ROW_NAMES = 'ABCDEFGHIJKLMNOPQRSTUVWXY';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, hint: 'Hover seats: the counter grows only for seats you touch.' });
  stage.root.classList.toggle('small', ctx.preview);

  const grid = document.createElement('div');
  grid.className = 'grid';
  const seats: HTMLElement[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const seat = document.createElement('div');
      seat.className = (r * 7 + c * 3) % 11 === 0 ? 'seat taken' : 'seat';
      seat.setAttribute('data-label', `Row ${ROW_NAMES[r]}, seat ${c + 1}`);
      grid.append(seat);
      seats.push(seat);
    }
  }
  const side = document.createElement('div');
  side.className = 'side';
  const seatCount = document.createElement('div');
  seatCount.textContent = `${seats.length} seats`;
  const tipCount = document.createElement('div');
  tipCount.className = 'tips';
  side.append(seatCount, tipCount);
  stage.root.append(grid, side);

  let tips = 0;
  const showCount = (): void => {
    tipCount.textContent = `${tips} tips exist`;
  };
  showCount();

  stage.own(
    delegate(grid, {
      target: '.seat',
      content: (reference) => reference.getAttribute('data-label') ?? '',
      placement: 'right',
      maxWidth: 140,
      appendTo: stage.root,
      // Runs for the delegate itself too; only count tips made for seats.
      onCreate(instance) {
        if (instance.reference === grid) return;
        tips++;
        showCount();
      },
      onDestroy(instance) {
        if (instance.reference === grid) return;
        tips--;
      },
    }),
  );

  if (stage.preview) {
    const path = [48, 95, 140, 262, 310, 205, 33, 490];
    stage.play(async (wait) => {
      for (const i of path) {
        await stage.ghost.hover(seats[i]!, 450);
        await wait(700);
      }
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

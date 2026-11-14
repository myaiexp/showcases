// Two scrolling tables: tips inside the clipping box are cut off, tips outside it are whole
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ORDERS: [string, string][] = [
  ['#1001', 'Packed at 09:12 by the north warehouse team'],
  ['#1002', 'Left the depot at 10:40, driver is on the A12'],
  ['#1003', 'Delivered to the front desk and signed for'],
  ['#1004', 'Waiting for payment confirmation from the bank'],
  ['#1005', 'Returned: parcel refused at the address'],
  ['#1006', 'Packed at 14:05 by the south warehouse team'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover the ⓘ marks, scrolling each table if you like.' });
  const marks: HTMLElement[] = [];

  for (const outside of [false, true]) {
    const col = document.createElement('div');
    col.className = 'col';
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = outside ? 'Attached outside the box' : 'Attached inside the box';
    const box = document.createElement('div');
    box.className = 'box';
    const table = document.createElement('table');
    for (const [id, note] of ORDERS) {
      const row = table.insertRow();
      row.insertCell().textContent = id;
      const cell = row.insertCell();
      const mark = document.createElement('span');
      mark.className = 'mark';
      mark.textContent = 'i';
      cell.append(mark);
      marks.push(mark);
      stage.own(
        tippy(mark, {
          content: note,
          placement: 'right',
          maxWidth: 170,
          // 'parent' puts the tip inside the scrolling box; stage.root is outside it.
          appendTo: outside ? stage.root : 'parent',
        }),
      );
    }
    box.append(table);
    col.append(caption, box);
    stage.root.append(col);
  }

  if (stage.preview) {
    const picks = [marks[1]!, marks[ORDERS.length + 1]!];
    stage.play(async (wait) => {
      for (const m of picks) {
        await stage.ghost.hover(m, 650);
        await wait(1500);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;

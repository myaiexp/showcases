// A dropdown with hideOnClick off: onClickOutside counts stray clicks
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const OPTIONS = ['Open', 'Closed', 'Assigned to me'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Open Filter, tick something, then click on empty space.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Filter ▾';
  const counter = document.createElement('div');
  counter.className = 'counter';
  stage.root.append(counter, button);

  const menu = document.createElement('div');
  menu.className = 'menu';
  const boxes = OPTIONS.map((label) => {
    const row = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    row.append(box, label);
    menu.append(row);
    return box;
  });
  const hint = document.createElement('div');
  hint.className = 'hint';
  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  const apply = document.createElement('button');
  apply.className = 'btn btn-primary';
  apply.textContent = 'Apply';
  const cancel = document.createElement('button');
  cancel.className = 'btn';
  cancel.textContent = 'Cancel';
  buttons.append(apply, cancel);
  menu.append(hint, buttons);

  let outside = 0;
  let applied = 'no filter';
  const showCount = (): void => {
    counter.textContent = `${applied} · ${outside} outside clicks`;
  };
  showCount();

  // The reaction to a click outside the dropdown. In a card the ghost sends no mousedown (see stage.ts),
  // so the script calls this by hand where a real click on empty space would have called it.
  const onOutside = (): void => {
    outside += 1;
    showCount();
    hint.textContent = 'Apply or Cancel?';
    hint.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0.3 }, { opacity: 1 }], { duration: 400 });
  };

  const tip = stage.own(
    tippy(button, {
      content: menu,
      trigger: 'click',
      interactive: true,
      hideOnClick: false,
      placement: 'bottom-start',
      appendTo: stage.root,
      onClickOutside: onOutside,
      onHidden: () => {
        hint.textContent = '';
      },
    }),
  );

  const finish = (apply_: boolean): void => {
    const chosen = OPTIONS.filter((_, i) => boxes[i]!.checked);
    if (apply_) applied = chosen.length ? chosen.join(', ') : 'no filter';
    else for (const b of boxes) b.checked = false;
    showCount();
    tip.hide();
  };
  apply.addEventListener('click', () => finish(true));
  cancel.addEventListener('click', () => finish(false));

  if (stage.preview) {
    stage.play(async (wait) => {
      applied = 'no filter';
      outside = 0;
      showCount();
      for (const b of boxes) b.checked = false;
      await stage.ghost.click(button, 700);
      await wait(500);
      // A ghost click never ticks a box, so the script ticks it.
      boxes[0]!.checked = true;
      await stage.ghost.moveTo(boxes[0]!, 500);
      await wait(400);
      await stage.ghost.moveTo({ x: 240, y: 170 }, 500);
      onOutside();
      await wait(1200);
      await stage.ghost.click(apply, 600);
      await wait(1500);
    });
  }

  return stage.dispose;
};

export default mount;

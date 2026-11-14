// Tooltips that flip and shift to stay inside the box, wherever their button sits
import tippy, { type Instance, type Placement } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, select } from '../../shared/controls.ts';
import './style.css';

// Nine buttons pinned to the corners, edges and middle of the scene.
const SPOTS = [
  ['↖', 'top-left'], ['↑', 'top'], ['↗', 'top-right'],
  ['←', 'left'], ['•', 'middle'], ['→', 'right'],
  ['↙', 'bottom-left'], ['↓', 'bottom'], ['↘', 'bottom-right'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 340,
    hint: 'Every tip prefers the side you pick. Hover the edge buttons to watch it flip or slide.',
  });

  const buttons = SPOTS.map(([icon, spot]) => {
    const b = document.createElement('button');
    b.className = `btn spot ${spot}`;
    b.textContent = icon;
    stage.root.append(b);
    return b;
  });

  let preferred: Placement = 'top';
  // `flip` jumps to the opposite side when the preferred one has no room;
  // `preventOverflow` slides the tip along its side to keep it inside the box.
  const popperOptions = (flip: boolean, shift: boolean) => ({
    modifiers: [
      { name: 'flip', enabled: flip },
      { name: 'preventOverflow', enabled: shift },
    ],
  });

  const tips: Instance[] = stage.own(
    tippy(buttons, {
      content: `Prefers ${preferred}`,
      placement: preferred,
      popperOptions: popperOptions(true, true),
      appendTo: stage.root,
    }),
  );

  if (stage.bar) {
    let flip = true;
    let shift = true;
    const update = (): void => {
      for (const t of tips) {
        t.setProps({ placement: preferred, popperOptions: popperOptions(flip, shift) });
        t.setContent(`Prefers ${preferred}`);
      }
    };
    const sides: Placement[] = ['top', 'bottom', 'left', 'right', 'auto'];
    select(stage.bar, 'preferred side', sides, (v) => {
      preferred = v;
      update();
    });
    checkbox(stage.bar, 'flip when there is no room', true, (v) => {
      flip = v;
      update();
    });
    checkbox(stage.bar, 'slide to stay inside', true, (v) => {
      shift = v;
      update();
    });
  } else {
    // Card: the pointer visits the top edge (the tip flips below), the bottom edge
    // (it stays on top) and the right edge (it slides left to stay inside).
    const tour = [buttons[1]!, buttons[7]!, buttons[2]!, buttons[4]!];
    stage.play(async (wait) => {
      for (const b of tour) {
        await stage.ghost.hover(b, 600);
        await wait(1300);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;

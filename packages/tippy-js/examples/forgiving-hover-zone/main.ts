// Two menus with a gap below their buttons: a 2px safety margin versus a 30px one
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 300,
    hint: 'Hover a button, then move to its menu on a slanted path. Which one survives?',
  });

  const tips: Instance[] = [];
  const buttons: HTMLElement[] = [];
  let zones = true;

  const drawZone = (tip: Instance, border: number): void => {
    // The safety margin is invisible; an outline around the tip, offset by the margin, shows it.
    const box = tip.popper;
    box.style.outline = zones ? '1px dashed var(--orange)' : '';
    box.style.outlineOffset = `${border}px`;
  };

  for (const border of [2, 30]) {
    const col = document.createElement('div');
    col.className = 'col';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = `Margin ${border} px`;
    col.append(b);
    stage.root.append(col);
    buttons.push(b);

    const menu = document.createElement('div');
    menu.className = 'menu';
    for (const label of ['Rename', 'Duplicate', 'Delete']) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'item';
      item.textContent = label;
      menu.append(item);
    }

    const tip = tippy(b, {
      content: menu,
      interactive: true,
      // How far outside the menu the pointer may stray before it closes.
      interactiveBorder: border,
      placement: 'bottom',
      offset: [0, 22],
      arrow: false,
      appendTo: stage.root,
      onMount: (t) => drawZone(t, border),
    });
    stage.own(tip);
    tips.push(tip);
  }

  if (stage.bar) {
    slider(stage.bar, 'Hide debounce', 0, 300, 25, 0, (v) => tips.forEach((t) => t.setProps({ interactiveDebounce: v })), (v) => `${v} ms`);
    checkbox(stage.bar, 'Show the margins', true, (v) => {
      zones = v;
      tips.forEach((t, i) => drawZone(t, i === 0 ? 2 : 30));
    });
  } else {
    // Card: the menus are opened by code (a real hover would follow the page's mouse), one at a time.
    stage.play(async (wait) => {
      for (const i of [0, 1]) {
        await stage.ghost.moveTo(buttons[i]!, 600);
        tips[i]!.show();
        await wait(2000);
        tips[i]!.hide();
        await wait(500);
      }
    });
  }

  return stage.dispose;
};

export default mount;

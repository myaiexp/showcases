// A list opens the tip of the matching diagram part by reading element._tippy
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

type WithTip = HTMLElement & { _tippy?: Instance };

const PARTS = [
  { cls: 'tank', label: 'Water tank', note: 'Fill with cold water.', placement: 'left' },
  { cls: 'head', label: 'Group head', note: 'Hot water is pushed through here.', placement: 'top' },
  { cls: 'wand', label: 'Steam wand', note: 'Froths the milk.', placement: 'right' },
  { cls: 'cup', label: 'Cup rest', note: 'Your cup goes here.', placement: 'right' },
  { cls: 'tray', label: 'Drip tray', note: 'Empty it daily.', placement: 'bottom' },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 290, hint: 'Click a name in the list, or hover the drawing.' });

  const machine = document.createElement('div');
  machine.className = 'machine';
  const list = document.createElement('div');
  list.className = 'list';
  const label = document.createElement('div');
  label.className = 'label';
  label.textContent = 'Where is…';
  list.append(label);

  const parts: WithTip[] = [];
  const buttons: HTMLButtonElement[] = [];
  for (const p of PARTS) {
    const part: WithTip = document.createElement('div');
    part.className = `part ${p.cls}`;
    machine.append(part);
    parts.push(part);
    // The instances are not stored anywhere: the element keeps its own, as part._tippy.
    stage.own(
      tippy(part, {
        content: `${p.label}: ${p.note}`,
        placement: p.placement,
        maxWidth: 130,
        trigger: 'mouseenter',
        appendTo: stage.root,
      }),
    );

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = p.label;
    btn.addEventListener('click', () => {
      for (const other of parts) other._tippy?.hide();
      part._tippy?.show();
    });
    list.append(btn);
    buttons.push(btn);
  }
  stage.root.append(machine, list);

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const i of [1, 2, 4]) {
        await stage.ghost.click(buttons[i]!, 600);
        await wait(1300);
      }
      for (const part of parts) part._tippy?.hide();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

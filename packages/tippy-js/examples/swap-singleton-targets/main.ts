// A mode switch that points one singleton at the view toolbar or the edit toolbar
import tippy, { createSingleton, type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const MODES = {
  View: ['Zoom in', 'Zoom out', 'Full screen'],
  Edit: ['Draw', 'Erase', 'Add text'],
} as const;
type Mode = keyof typeof MODES;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Switch between View and Edit, then hover the toolbar.' });

  const switcher = document.createElement('div');
  switcher.className = 'switch';
  const modeButtons = (Object.keys(MODES) as Mode[]).map((mode) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = mode;
    switcher.append(b);
    return b;
  });
  const toolbars = {} as Record<Mode, { el: HTMLElement; buttons: HTMLButtonElement[]; tips: Instance[] }>;
  const holder = document.createElement('div');
  holder.className = 'holder';
  for (const mode of Object.keys(MODES) as Mode[]) {
    const bar = document.createElement('div');
    bar.className = 'toolbar';
    const buttons = MODES[mode].map((label) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      bar.append(b);
      return b;
    });
    const tips = buttons.map((b, i) => stage.own(tippy(b, { content: `${MODES[mode][i]} (${mode} mode)` })));
    toolbars[mode] = { el: bar, buttons, tips };
    holder.append(bar);
  }
  const note = document.createElement('div');
  note.className = 'note';
  stage.root.append(switcher, holder, note);

  let mode: Mode = 'View';
  const singleton = stage.own(
    createSingleton(toolbars.View.tips, {
      delay: [150, 100],
      moveTransition: 'transform 0.2s ease-out',
      placement: 'bottom',
      appendTo: stage.root,
    }),
  );

  const setMode = (next: Mode): void => {
    mode = next;
    singleton.hide();
    // The one tip box now belongs to the other toolbar's buttons.
    singleton.setInstances(toolbars[mode].tips);
    for (const m of Object.keys(MODES) as Mode[]) toolbars[m].el.hidden = m !== mode;
    modeButtons.forEach((b) => b.classList.toggle('btn-primary', b.textContent === mode));
    note.textContent = `Singleton serves ${toolbars[mode].tips.length} ${mode} buttons`;
  };
  modeButtons.forEach((b) => b.addEventListener('click', () => setMode(b.textContent as Mode)));
  setMode('View');

  if (stage.preview) {
    stage.play(async (wait) => {
      const [view, edit] = modeButtons as [HTMLButtonElement, HTMLButtonElement];
      await stage.ghost.hover(toolbars.View.buttons[0]!, 600);
      await wait(900);
      await stage.ghost.hover(toolbars.View.buttons[1]!, 200);
      await wait(900);
      stage.ghost.leave();
      await stage.ghost.click(edit, 600);
      await wait(400);
      await stage.ghost.hover(toolbars.Edit.buttons[0]!, 600);
      await wait(900);
      await stage.ghost.hover(toolbars.Edit.buttons[2]!, 250);
      await wait(900);
      stage.ghost.leave();
      await stage.ghost.click(view, 600);
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;

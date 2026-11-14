// A switch calls hide() and disable() on every help tip, enable() to undo
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FIELDS: [string, string, string][] = [
  ['Name', 'text', 'Your name as shown on invoices.'],
  ['Email', 'email', 'We only write about your account.'],
  ['Password', 'password', 'At least 8 characters.'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 250, hint: 'Hover the i icons, then switch help off and try again.' });

  const form = document.createElement('div');
  form.className = 'form';
  const toggle = document.createElement('label');
  toggle.className = 'switch';
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = true;
  const state = document.createElement('span');
  toggle.append(box, 'Show help tips ', state);
  form.append(toggle);

  const icons: HTMLButtonElement[] = [];
  for (const [label, type, help] of FIELDS) {
    const row = document.createElement('div');
    row.className = 'field';
    const name = document.createElement('span');
    name.textContent = label;
    const input = document.createElement('input');
    input.type = type;
    const icon = document.createElement('button');
    icon.type = 'button';
    icon.className = 'info';
    icon.textContent = 'i';
    icon.setAttribute('aria-label', `Help: ${label}`);
    icon.dataset.help = help;
    row.append(name, input, icon);
    form.append(row);
    icons.push(icon);
  }
  stage.root.append(form);

  const tips = stage.own(
    tippy(icons, {
      content: (icon) => (icon as HTMLElement).dataset.help ?? '',
      placement: 'right',
      maxWidth: 120,
      appendTo: stage.root,
    }),
  );

  const apply = (on: boolean): void => {
    box.checked = on;
    state.textContent = on ? '(on)' : '(off)';
    for (const tip of tips) {
      if (on) tip.enable();
      else {
        // An open tip would be frozen open by disable(), so close it first.
        tip.hide();
        tip.disable();
      }
    }
  };
  box.addEventListener('change', () => apply(box.checked));
  apply(true);

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(icons[1]!, 700);
      await wait(1200);
      stage.ghost.leave();
      await stage.ghost.click(box, 500);
      // A ghost click never ticks a checkbox, so the script flips the switch itself.
      apply(false);
      await wait(500);
      await stage.ghost.hover(icons[1]!, 600);
      await wait(1200);
      stage.ghost.leave();
      await stage.ghost.click(box, 500);
      apply(true);
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;

// A pricing plan whose feature notes open on click and close on a second click or a click elsewhere
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FEATURES: [string, string][] = [
  ['5 projects', 'You can have five active projects. Archive one to free a slot.'],
  ['Priority support', 'Replies within four working hours, instead of two days.'],
  ['Export to PDF', 'Any report, with your logo and colours on every page.'],
  ['Team seats', 'Two seats are included. Extra seats are billed per person.'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Click an ⓘ. Click it again, or anywhere else, to close.' });

  stage.root.classList.toggle('mini', stage.preview);
  const card = document.createElement('div');
  card.className = 'plan';
  const head = document.createElement('div');
  head.className = 'head';
  head.textContent = 'Pro · $12 / month';
  card.append(head);

  const icons = FEATURES.map(([label, note]) => {
    const row = document.createElement('div');
    row.className = 'row';
    const text = document.createElement('span');
    text.textContent = label;
    const icon = document.createElement('button');
    icon.type = 'button';
    icon.className = 'info';
    icon.textContent = 'i';
    icon.setAttribute('aria-label', `About ${label}`);
    icon.dataset.tippyContent = note;
    row.append(text, icon);
    card.append(row);
    return icon;
  });
  stage.root.append(card);

  // Click opens; a second click on the icon, or a click anywhere else, closes.
  stage.own(
    tippy(icons, {
      trigger: 'click',
      placement: 'right',
      maxWidth: stage.preview ? 110 : 190,
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const icon of [icons[0]!, icons[2]!]) {
        await stage.ghost.click(icon, 700);
        await wait(1600);
        await stage.ghost.click(icon); // a second click on the icon closes it
        await wait(400);
      }
      await stage.ghost.moveTo({ x: 220, y: 160 }, 600);
    });
  }

  return stage.dispose;
};

export default mount;

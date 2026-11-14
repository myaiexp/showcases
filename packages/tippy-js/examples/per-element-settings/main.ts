// A settings form: four help icons, each configured by its own data-tippy-* attributes
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// Attribute values are JSON: strings, numbers, booleans and arrays all work.
const FIELDS = [
  { label: 'Username', tip: 'Shown on your public profile.', attrs: { placement: 'right' }, note: 'right' },
  { label: 'Password', tip: 'At least 12 characters.', attrs: { placement: 'right', arrow: 'false' }, note: 'right, no arrow' },
  { label: 'Timezone', tip: 'Used for reminder emails.', attrs: { placement: 'bottom' }, note: 'below' },
  { label: 'Backup email', tip: 'Only used if you lose access.', attrs: { placement: 'right', delay: '[600, 0]' }, note: 'right, slow start' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 290, hint: 'Hover or Tab to each ⓘ. Every one behaves differently.' });

  const form = document.createElement('div');
  form.className = 'form';
  const icons = FIELDS.map((f) => {
    const row = document.createElement('div');
    row.className = 'row';
    const label = document.createElement('span');
    label.className = 'name';
    label.textContent = f.label;
    const icon = document.createElement('button');
    icon.className = 'help';
    icon.textContent = 'ⓘ';
    icon.setAttribute('aria-label', `Help: ${f.label}`);
    icon.setAttribute('data-tippy-content', f.tip);
    for (const [k, v] of Object.entries(f.attrs)) icon.setAttribute(`data-tippy-${k}`, v);
    const note = document.createElement('span');
    note.className = 'note';
    note.textContent = f.note;
    row.append(label, icon, note);
    form.append(row);
    return icon;
  });
  stage.root.append(form);

  // One call, no per-icon options: each icon's attributes do the rest.
  stage.own(tippy(stage.root.querySelectorAll('.help'), { appendTo: stage.root }));

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const icon of icons) {
        await stage.ghost.hover(icon, 450);
        await wait(icon === icons[3] ? 1700 : 1100);
      }
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

// A note popover whose onHide returns false while there is unsaved text
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Click Quick note, type, then click away. Save closes it.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Quick note';
  const saved = document.createElement('div');
  saved.className = 'saved';
  saved.textContent = 'Nothing saved yet';
  stage.root.append(button, saved);

  // The tip's content is a small form built with DOM calls.
  const form = document.createElement('div');
  form.className = 'note';
  const text = document.createElement('textarea');
  text.rows = 2;
  text.placeholder = 'Write a note…';
  const row = document.createElement('div');
  row.className = 'row';
  const hint = document.createElement('span');
  hint.className = 'hint';
  const save = document.createElement('button');
  save.className = 'btn btn-primary';
  save.textContent = 'Save';
  row.append(hint, save);
  form.append(text, row);

  const isDirty = (): boolean => text.value.trim() !== '';

  const tip = stage.own(
    tippy(button, {
      content: form,
      trigger: 'click',
      interactive: true,
      placement: 'bottom-start',
      appendTo: stage.root,
      // Returning false from onHide keeps the tip open. Clicking away while the note has text only nudges.
      onHide(instance) {
        if (!isDirty()) return undefined;
        hint.textContent = 'Save your note first';
        // `translate` is separate from the tip's own transform, so the animation does not fight it.
        instance.popper.animate(
          [{ translate: '0 0' }, { translate: '-6px 0' }, { translate: '6px 0' }, { translate: '-4px 0' }, { translate: '0 0' }],
          { duration: 320 },
        );
        return false;
      },
      onHidden: () => {
        hint.textContent = '';
      },
    }),
  );

  save.addEventListener('click', () => {
    saved.textContent = `Saved: ${text.value.trim()}`;
    text.value = '';
    hint.textContent = '';
    tip.hide();
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      saved.textContent = 'Nothing saved yet';
      await stage.ghost.click(button, 700);
      await wait(400);
      await stage.ghost.type(text, 'Call Sam at 3', 60);
      await wait(400);
      // A real click on empty space would reach onHide the same way; the ghost sends no mousedown (see stage.ts).
      await stage.ghost.moveTo({ x: 230, y: 160 }, 500);
      tip.hide();
      await wait(1200);
      await stage.ghost.click(save, 600);
      await wait(1400);
    });
  }

  return stage.dispose;
};

export default mount;

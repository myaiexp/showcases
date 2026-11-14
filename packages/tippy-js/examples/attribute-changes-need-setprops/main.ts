// Editing data-tippy-content leaves a tip stale unless a MutationObserver calls setProps
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const START = 'Hello';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 270, hint: 'Type a new text, then hover both buttons.' });

  const field = document.createElement('input');
  field.value = START;
  field.setAttribute('aria-label', 'New tooltip text');
  const cols = document.createElement('div');
  cols.className = 'cols';

  const column = (caption: string): { button: HTMLButtonElement; attr: HTMLElement } => {
    const col = document.createElement('div');
    col.className = 'col';
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = caption;
    const attr = document.createElement('code');
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = 'Button';
    button.setAttribute('data-tippy-content', START);
    col.append(cap, attr, button);
    cols.append(col);
    return { button, attr };
  };
  const stale = column('Attribute only');
  const live = column('With observer');
  stage.root.append(field, cols);

  const options = { placement: 'bottom' as const, maxWidth: 125, appendTo: stage.root };
  // Both tips read the attribute once, here.
  const staleTip = stage.own(tippy(stale.button, options));
  const liveTip = stage.own(tippy(live.button, options));

  // The fix: watch the attribute and push each new value into the instance.
  const observer = new MutationObserver(() => {
    liveTip.setProps({ content: live.button.getAttribute('data-tippy-content') ?? '' });
  });
  observer.observe(live.button, { attributes: true, attributeFilter: ['data-tippy-content'] });
  stage.own({ destroy: () => observer.disconnect() });

  const show = (b: HTMLElement, a: HTMLElement): void => {
    a.textContent = `"${b.getAttribute('data-tippy-content')}"`;
  };
  const apply = (text: string): void => {
    // Editing the markup, as any script or framework might.
    stale.button.setAttribute('data-tippy-content', text);
    live.button.setAttribute('data-tippy-content', text);
    show(stale.button, stale.attr);
    show(live.button, live.attr);
  };
  apply(START);
  field.addEventListener('input', () => apply(field.value || ' '));

  if (stage.preview) {
    stage.play(async (wait) => {
      field.value = '';
      apply(START);
      liveTip.setProps({ content: START });
      await stage.ghost.moveTo(field, 600);
      await stage.ghost.type(field, 'Bye now', 90);
      await wait(400);
      await stage.ghost.moveTo(stale.button, 600);
      await wait(50);
      staleTip.show();
      await wait(1000);
      await stage.ghost.moveTo(live.button, 600);
      await wait(50);
      liveTip.show();
      await wait(1800);
      staleTip.hide();
      liveTip.hide();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

// The docs' hideOnPopperBlur plugin on an interactive reply form
import tippy, { type Plugin, type Props, type Tippy } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The docs' plugin: hide when focus moves from inside the popper to something outside it.
const hideOnPopperBlur: Plugin = {
  name: 'hideOnPopperBlur',
  defaultValue: true,
  fn(instance) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event) => {
          const next = (event as FocusEvent).relatedTarget as Node | null;
          const props = instance.props as Props & { hideOnPopperBlur?: boolean };
          if (props.hideOnPopperBlur && next && !instance.popper.contains(next)) instance.hide();
        });
      },
    };
  },
};

// The TypeScript section of the plugins page: the new prop is added to the props type.
const tippyWithBlur = tippy as unknown as Tippy<Props & { hideOnPopperBlur: boolean }>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Click Reply, then press Tab. Untick the box to compare.' });

  const form = document.createElement('div');
  form.className = 'form';
  const field = document.createElement('input');
  field.placeholder = 'Your reply';
  const send = document.createElement('button');
  send.className = 'btn btn-primary';
  send.textContent = 'Send';
  form.append(field, send);

  const reply = document.createElement('button');
  reply.className = 'btn btn-primary';
  reply.textContent = 'Reply';
  const search = document.createElement('input');
  search.className = 'search';
  search.placeholder = 'Search';
  stage.root.append(reply, search);

  const tip = stage.own(
    tippyWithBlur(reply, {
      content: form,
      trigger: 'click',
      interactive: true,
      placement: 'bottom-start',
      maxWidth: 190,
      appendTo: stage.root,
      plugins: [hideOnPopperBlur],
      onShown: () => {
        if (!stage.preview) field.focus({ preventScroll: true });
      },
    }),
  );

  if (stage.bar) {
    checkbox(stage.bar, 'Close when focus leaves the form', true, (on) => tip.setProps({ hideOnPopperBlur: on }));
  }

  const key = document.createElement('kbd');
  key.className = 'key';
  key.textContent = 'Tab';
  stage.root.append(key);

  if (stage.preview) {
    stage.play(async (wait) => {
      field.value = '';
      await stage.ghost.click(reply, 700);
      await wait(500);
      await stage.ghost.type(field, 'Thanks!', 80);
      await wait(500);
      await stage.ghost.moveTo({ x: 200, y: 160 }, 400);
      key.classList.add('down');
      await wait(250);
      // Card: send the focusout a real Tab would, with the next field as relatedTarget.
      tip.popper.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: search }));
      await wait(250);
      key.classList.remove('down');
      await wait(1100);
    });
  }

  return stage.dispose;
};

export default mount;

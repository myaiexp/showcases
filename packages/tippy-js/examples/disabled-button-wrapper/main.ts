// A sign-up form whose disabled Submit explains itself through a wrapper span
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover the greyed-out button, then tick the box.' });

  const form = document.createElement('div');
  form.className = 'form';
  const title = document.createElement('strong');
  title.textContent = 'Create your account';
  const email = document.createElement('input');
  email.className = 'field';
  email.placeholder = 'you@example.com';
  const terms = document.createElement('label');
  terms.className = 'terms';
  const box = document.createElement('input');
  box.type = 'checkbox';
  terms.append(box, ' I accept the terms');

  // A disabled element gets no mouse or focus events, so the tip goes on a wrapper.
  const wrapper = document.createElement('span');
  wrapper.className = 'wrapper';
  wrapper.tabIndex = 0;
  const submit = document.createElement('button');
  submit.className = 'btn btn-primary';
  submit.disabled = true;
  submit.textContent = 'Sign up';
  wrapper.append(submit);
  const done = document.createElement('div');
  done.className = 'done';
  form.append(title, email, terms, wrapper, done);
  stage.root.append(form);

  const tip = stage.own(
    tippy(wrapper, { content: 'Accept the terms first', placement: 'bottom', appendTo: stage.root }),
  );

  const sync = (): void => {
    submit.disabled = !box.checked;
    done.textContent = '';
    // Once the button works there is nothing left to explain.
    if (box.checked) tip.disable();
    else tip.enable();
  };
  box.addEventListener('change', sync);
  submit.addEventListener('click', () => {
    done.textContent = 'Welcome aboard!';
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      box.checked = false;
      sync();
      await stage.ghost.hover(wrapper, 700);
      await wait(1300);
      stage.ghost.leave();
      await stage.ghost.click(box, 600);
      // A ghost click never ticks a real checkbox, so the script does it.
      box.checked = true;
      sync();
      await wait(400);
      await stage.ghost.hover(wrapper, 500);
      await wait(1200);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 40, y: 150 }, 500);
    });
  }

  return stage.dispose;
};

export default mount;

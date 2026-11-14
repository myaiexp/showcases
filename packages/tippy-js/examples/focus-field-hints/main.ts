// A sign-up form: the password rules appear on focus and tick off as the user types
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const RULES: [string, (v: string) => boolean][] = [
  ['At least 8 characters', (v) => v.length >= 8],
  ['A number', (v) => /\d/.test(v)],
  ['A capital letter', (v) => /[A-Z]/.test(v)],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Click into the password field and type.' });

  const form = document.createElement('div');
  form.className = 'form';
  const field = (label: string, type: string): HTMLInputElement => {
    const wrap = document.createElement('label');
    wrap.append(label);
    const input = document.createElement('input');
    input.type = type;
    input.autocomplete = 'off';
    wrap.append(input);
    form.append(wrap);
    return input;
  };
  field('Username', 'text');
  const password = field('Password', stage.preview ? 'text' : 'password');
  stage.root.append(form);

  // The tip's content is a list of rules, ticked off live.
  const list = document.createElement('ul');
  list.className = 'rules';
  const items = RULES.map(([text]) => {
    const li = document.createElement('li');
    li.textContent = text;
    list.append(li);
    return li;
  });
  const check = (): void => RULES.forEach(([, ok], i) => items[i]!.classList.toggle('ok', ok(password.value)));
  password.addEventListener('input', check);
  check();

  stage.own(
    tippy(password, {
      content: list,
      // Opens when the field gets focus. Clicking into it must not close it again (see the FAQ).
      trigger: 'focus',
      hideOnClick: false,
      placement: 'bottom-start',
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    stage.play(async (wait) => {
      password.value = '';
      check();
      await stage.ghost.moveTo(password, 600);
      stage.ghost.focus(password);
      await wait(500);
      await stage.ghost.type(password, 'tulip42X', 150);
      await wait(1100);
      stage.ghost.blur(password);
      await stage.ghost.moveTo({ x: 40, y: 160 }, 500);
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

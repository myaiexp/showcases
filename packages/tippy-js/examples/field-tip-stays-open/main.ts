// Focus-triggered hints on two inputs: the default hideOnClick against hideOnClick: false
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    height: 240,
    hint: 'Tab into a field (or click it), then click inside the field again.',
  });

  const row = document.createElement('div');
  row.className = 'row';
  const field = (caption: string): HTMLInputElement => {
    const wrap = document.createElement('label');
    const cap = document.createElement('span');
    cap.textContent = caption;
    const input = document.createElement('input');
    input.placeholder = 'Username';
    wrap.append(cap, input);
    row.append(wrap);
    return input;
  };
  const vanishing = field('Hint vanishes on click');
  const steady = field('Hint stays');
  stage.root.append(row);

  const props = { content: '3 to 12 letters, no spaces', trigger: 'focus', placement: 'bottom' as const, maxWidth: 125, appendTo: stage.root };
  const a = stage.own(tippy(vanishing, props));
  // The FAQ's fix: a focus trigger on an input needs hideOnClick: false.
  const b = stage.own(tippy(steady, { ...props, hideOnClick: false }));

  if (stage.preview) {
    stage.play(async (wait) => {
      steady.value = '';
      await stage.ghost.moveTo(vanishing, 600);
      stage.ghost.focus(vanishing);
      await wait(900);
      await stage.ghost.click(vanishing, 100);
      // Card: Tippy listens for mousedown on the document, which cards never send;
      // this is the hide a real click inside the field causes.
      a.hide();
      await wait(1000);
      await stage.ghost.moveTo(steady, 600);
      stage.ghost.blur(vanishing);
      stage.ghost.focus(steady);
      await wait(700);
      await stage.ghost.click(steady, 100);
      await stage.ghost.type(steady, 'maya', 120);
      await wait(1200);
      stage.ghost.blur(steady);
      b.hide();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

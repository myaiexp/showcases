// Slide split characters up from below, with the wrap overflow switchable
import { animate, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, setActive } from './ui.ts';
import './style.css';

const WRAPS = ['visible', 'clip', 'hidden'] as const;
type Wrap = (typeof WRAPS)[number];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Rise and shine';
  stage.append(p);
  el.append(stage);

  let split: ReturnType<typeof splitText> | undefined;
  let anim: ReturnType<typeof animate> | undefined;

  const show = (wrap: Wrap): void => {
    anim?.revert();
    split?.revert();
    const { chars } = (split = splitText(p, { chars: { wrap } }));
    anim = animate(chars, {
      y: ['100%', '0%'],
      duration: 750,
      ease: 'out(3)',
      delay: stagger(50),
      loop: true,
      alternate: true,
      loopDelay: 400,
    });
  };

  let timer = 0;
  const buttons: HTMLButtonElement[] = [];
  if (preview) {
    let i = 1;
    show('clip');
    timer = window.setInterval(() => show(WRAPS[++i % 2 ? 1 : 0]!), 4200);
  } else {
    const row = controlRow(el);
    WRAPS.forEach((wrap, i) =>
      buttons.push(
        button(row, `wrap: '${wrap}'`, () => {
          setActive(buttons, i);
          show(wrap);
        }),
      ),
    );
    setActive(buttons, 1);
    show('clip');
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
    split?.revert();
    el.replaceChildren();
  };
};

export default mount;

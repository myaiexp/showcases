// Clone split characters in four directions and roll them through a clip wrapper
import { animate, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, setActive } from './ui.ts';
import './style.css';

type Clone = 'bottom' | 'top' | 'left' | 'right';
// The clone sits on one side of the original, so the pair slides the opposite way.
const MOVES: Record<Clone, Record<string, string>> = {
  bottom: { y: '-100%' },
  top: { y: '100%' },
  right: { x: '-100%' },
  left: { x: '100%' },
};
const CLONES = Object.keys(MOVES) as Clone[];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Roll over';
  stage.append(p);
  el.append(stage);

  let split: ReturnType<typeof splitText> | undefined;
  let anim: ReturnType<typeof animate> | undefined;

  const show = (clone: Clone): void => {
    anim?.revert();
    split?.revert();
    const { chars } = (split = splitText(p, { chars: { wrap: 'clip', clone } }));
    anim = animate(chars, {
      ...MOVES[clone],
      duration: 750,
      ease: 'inOut(2)',
      delay: stagger(90, { from: 'center' }),
      loop: true,
      alternate: true,
      loopDelay: 500,
    });
  };

  let timer = 0;
  const buttons: HTMLButtonElement[] = [];
  if (preview) {
    let i = 0;
    show(CLONES[0]!);
    timer = window.setInterval(() => show(CLONES[++i % CLONES.length]!), 3800);
  } else {
    const row = controlRow(el);
    CLONES.forEach((clone, i) =>
      buttons.push(
        button(row, `clone: '${clone}'`, () => {
          setActive(buttons, i);
          show(clone);
        }),
      ),
    );
    setActive(buttons, 0);
    show('bottom');
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
    split?.revert();
    el.replaceChildren();
  };
};

export default mount;

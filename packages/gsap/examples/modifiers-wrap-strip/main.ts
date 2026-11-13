// A seamless looping strip: one repeating tween plus an x modifier that wraps values with modulus
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const COUNT = 8;
const SIZE = 30;
const LENGTH = COUNT * SIZE;
const COLORS = ['#0ae448', '#ff8709', '#9d95ff', '#00bae2'];

const mount: Mount = (el, { preview }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const boxes: HTMLElement[] = [];
  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement('div');
    b.className = 'box';
    b.textContent = String(i + 1);
    boxes.push(b);
    wrapper.append(b);
  }
  el.append(wrapper);

  let tweened: HTMLElement | undefined;
  let modified: HTMLElement | undefined;
  let checkbox: HTMLInputElement | undefined;
  const onToggle = (): void => {
    wrapper.classList.toggle('overflow', Boolean(checkbox?.checked));
  };

  if (!preview) {
    const info = document.createElement('div');
    info.className = 'info';
    tweened = document.createElement('span');
    modified = document.createElement('span');
    info.append(tweened, modified);
    const label = document.createElement('label');
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', onToggle);
    label.append(checkbox, ' Show overflow');
    el.append(info, label);
  }

  const ctx = gsap.context(() => {
    gsap.set(boxes, {
      backgroundColor: (i: number) => COLORS[i % COLORS.length] ?? '#fff',
      x: (i: number) => i * SIZE,
    });
    gsap.to(boxes, {
      duration: 6,
      ease: 'none',
      x: `+=${LENGTH}`, // every box travels a whole strip length to the right
      modifiers: {
        // ...but the modifier folds each value back into 0..LENGTH, so the strip never ends
        x: gsap.utils.unitize((raw: number | string, target: object) => {
          const x = parseFloat(String(raw));
          if (tweened && modified && target === boxes[0]) {
            tweened.textContent = `tweened x: ${x.toFixed(0)}`;
            modified.textContent = `modified x: ${(x % LENGTH).toFixed(0)}`;
          }
          return x % LENGTH;
        }),
      },
      repeat: -1,
    });
  }, el);

  return () => {
    checkbox?.removeEventListener('change', onToggle);
    ctx.revert();
  };
};

export default mount;

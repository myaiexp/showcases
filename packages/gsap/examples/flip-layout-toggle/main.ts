// Flip: capture a grid, switch the container to a list, and animate the difference
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Flip);

const COUNT = 8;

const mount: Mount = (el, { preview }) => {
  const box = document.createElement('div');
  box.className = 'box';
  const items: HTMLElement[] = [];
  for (let i = 0; i < COUNT; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.textContent = String(i + 1);
    item.style.setProperty('--hue', String(200 + i * 20));
    items.push(item);
    box.append(item);
  }
  el.append(box);

  const readout = document.createElement('p');
  readout.className = 'readout';

  const ctx = gsap.context(() => {}, el);

  let flip: gsap.core.Timeline | undefined;

  const toggle = (): void => {
    // First: record where every item is now
    const state = Flip.getState(items);
    // Last: change the layout with a plain class toggle
    box.classList.toggle('list');
    readout.textContent = box.classList.contains('list') ? 'layout: list' : 'layout: grid';
    // Invert + Play: Flip jumps items back to the old state, then animates to the new one
    // Created outside the context (ignore) so repeated toggles don't pile up in ctx.data
    flip?.revert();
    ctx.ignore(() => {
      flip = Flip.from(state, {
        duration: 0.8,
        ease: 'power1.inOut',
        stagger: 0.04,
        absolute: true,
      });
    });
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(toggle, 2200);
  } else {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Toggle grid / list';
    btn.addEventListener('click', toggle);
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append(btn, readout);
    el.append(controls);
    readout.textContent = 'layout: grid';
  }

  return () => {
    window.clearInterval(timer);
    Flip.killFlipsOf(items);
    flip?.revert();
    ctx.revert();
  };
};

export default mount;

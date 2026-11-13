// Flip.fit: one box resizes and moves to fit exactly over whichever slot is chosen
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Flip);

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const slots = ['a', 'b', 'c'].map((id) => {
    const slot = document.createElement('div');
    slot.className = `slot slot-${id}`;
    slot.textContent = id.toUpperCase();
    stage.append(slot);
    return slot;
  });
  const mover = document.createElement('div');
  mover.className = 'mover';
  stage.append(mover);
  el.append(stage);

  const ctx = gsap.context(() => {}, el);

  let fit: gsap.core.Tween | undefined;

  const fitTo = (slot: HTMLElement | undefined, scale: boolean): void => {
    if (!slot) return;
    // Created outside the context (ignore) so repeated fits don't pile up in ctx.data
    ctx.ignore(() => {
      // Animated because a duration is given; without one the fit is instant
      const r = Flip.fit(mover, slot, { duration: 0.9, ease: 'power2.inOut', scale });
      fit = r instanceof gsap.core.Tween ? r : undefined;
    });
  };

  let timer = 0;
  const buttons: HTMLButtonElement[] = [];
  if (preview) {
    let n = 0;
    fitTo(slots[0], false);
    timer = window.setInterval(() => fitTo(slots[++n % slots.length], false), 1600);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const scaleLabel = document.createElement('label');
    const scaleBox = document.createElement('input');
    scaleBox.type = 'checkbox';
    scaleLabel.append(scaleBox, ' scale: true (transform instead of width/height)');
    slots.forEach((slot, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = `Fit to ${'ABC'[i]}`;
      b.addEventListener('click', () => fitTo(slot, scaleBox.checked));
      buttons.push(b);
      controls.append(b);
    });
    controls.append(scaleLabel);
    el.append(controls);
  }

  return () => {
    window.clearInterval(timer);
    gsap.killTweensOf(mover);
    fit?.revert();
    ctx.revert();
  };
};

export default mount;

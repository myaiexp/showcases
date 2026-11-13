// GSAP staggered bar timeline with transport buttons and a scrubber
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

function button(label: string, onClick: () => void, primary = false): HTMLButtonElement {
  const b = document.createElement('button');
  b.textContent = label;
  b.className = primary ? 'btn btn-primary' : 'btn';
  b.addEventListener('click', onClick);
  return b;
}

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'bars';
  const bars: HTMLElement[] = [];
  for (let i = 0; i < 6; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bars.push(bar);
    stage.append(bar);
  }
  el.append(stage);

  const tl = gsap.timeline({
    paused: true,
    // A preview has no controls, so it loops by itself.
    repeat: preview ? -1 : 0,
    repeatDelay: 0.6,
  });
  tl.from(bars, {
    scaleY: 0,
    opacity: 0,
    rotation: -8,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: 0.12,
  }).to(bars, {
    scaleY: 0.4,
    duration: 0.4,
    ease: 'power2.inOut',
    stagger: { each: 0.08, yoyo: true, repeat: 1 },
  });

  if (!preview) {
    const scrub = document.createElement('input');
    Object.assign(scrub, { type: 'range', min: '0', max: '1000', value: '0' });
    const pct = document.createElement('span');
    pct.className = 'pct';
    pct.textContent = '0%';
    const scrubber = document.createElement('div');
    scrubber.className = 'scrubber';
    scrubber.append(scrub, pct);

    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    buttons.append(
      button('Play', () => void tl.play(), true),
      button('Pause', () => void tl.pause()),
      button('Reverse', () => void tl.reverse()),
      button('Restart', () => void tl.restart()),
    );
    el.append(scrubber, buttons);

    // Keep the scrubber in sync as the timeline plays.
    tl.eventCallback('onUpdate', () => {
      const p = tl.progress();
      scrub.value = String(Math.round(p * 1000));
      pct.textContent = `${Math.round(p * 100)}%`;
    });
    scrub.addEventListener('input', () => {
      const p = Number(scrub.value) / 1000;
      tl.pause().progress(p);
      pct.textContent = `${Math.round(p * 100)}%`;
    });
  }

  tl.play();
  return () => {
    tl.kill();
    gsap.killTweensOf(bars);
  };
};

export default mount;

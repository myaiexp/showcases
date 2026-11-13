// A looping timeline whose speed and direction are controlled with timeScale, reverse and reversed
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const bars: HTMLElement[] = [];
  for (let i = 0; i < 5; i++) {
    const b = document.createElement('div');
    b.className = 'bar';
    row.append(b);
    bars.push(b);
  }
  const readout = document.createElement('p');
  readout.className = 'readout';
  el.append(row, readout);

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    // defaults are inherited by every child created with to()/from()/fromTo()
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, defaults: { duration: 0.6, ease: 'power2.inOut' } });
    tl.to(bars, { y: -40, backgroundColor: '#34c38f', stagger: 0.12 })
      .to(bars, { rotation: 90, scale: 0.7, stagger: 0.12 }, '+=0.2')
      .to(bars, { y: 0, rotation: 0, scale: 1, backgroundColor: '#4f9cff', stagger: 0.12 }, '+=0.2');

    const show = (): void => {
      readout.textContent = `timeScale() ${tl.timeScale().toFixed(2)} | reversed() ${tl.reversed()} | progress ${tl.progress().toFixed(2)}`;
    };
    tl.eventCallback('onUpdate', show);
    show();

    if (preview) {
      // Tween the timeline's own timeScale so the card speeds up and slows down by itself.
      gsap.to(tl, { timeScale: 3, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      return;
    }

    const controls = document.createElement('div');
    controls.className = 'controls';
    const btn = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', () => {
        fn();
        show();
      });
      controls.append(b);
    };
    btn('pause()', () => tl.pause());
    btn('resume()', () => tl.resume());
    btn('reverse()', () => tl.reverse());
    btn('play()', () => tl.play());
    btn('reversed(!reversed())', () => tl.reversed(!tl.reversed()));
    const label = document.createElement('label');
    label.textContent = 'timeScale ';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0.1';
    slider.max = '4';
    slider.step = '0.1';
    slider.value = '1';
    slider.addEventListener('input', () => {
      tl.timeScale(Number(slider.value));
      show();
    });
    label.append(slider);
    controls.append(label);
    el.append(controls);
    cleanups.push(() => controls.remove());
  }, el);

  return () => {
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;

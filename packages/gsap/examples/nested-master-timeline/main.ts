// Three section functions each return a timeline; a master timeline stitches them together
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const mk = (cls: string): HTMLElement => {
    const d = document.createElement('div');
    d.className = cls;
    stage.append(d);
    return d;
  };
  const dots = [mk('dot a'), mk('dot b'), mk('dot c'), mk('dot d')];
  const ring = mk('ring');
  const caption = document.createElement('p');
  caption.className = 'readout';
  el.append(stage, caption);

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    // Each section is its own timeline, built and returned by a function.
    const intro = (): gsap.core.Timeline =>
      gsap.timeline().from(dots, { y: -60, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'bounce.out' });
    const middle = (): gsap.core.Timeline =>
      gsap
        .timeline({ defaults: { duration: 0.6, ease: 'power2.inOut' } })
        .to(dots, { x: (i: number) => (i - 1.5) * 50, rotation: 180 })
        .to(dots, { scale: 1.5, stagger: 0.1 }, '<0.2');
    const conclusion = (): gsap.core.Timeline =>
      gsap
        .timeline()
        .to(dots, { x: 0, scale: 1, rotation: 0, duration: 0.5, ease: 'power3.in' })
        .fromTo(ring, { scale: 0, opacity: 1 }, { scale: 3, opacity: 0, duration: 0.7 }, '>-0.1');

    const master = gsap.timeline({ repeat: preview ? -1 : 0, repeatDelay: 0.6 });
    master
      .add(intro())
      .add(middle(), '+=0.3') // a 0.3s gap after the intro
      .add(conclusion(), '-=0.2'); // overlaps the end of the middle section
    caption.textContent = `master.duration() = ${master.duration().toFixed(2)}s`;
    if (preview) return;

    const row = document.createElement('div');
    row.className = 'row';
    const play = document.createElement('button');
    play.className = 'btn btn-primary';
    play.textContent = 'Play / pause';
    play.addEventListener('click', () => (master.progress() === 1 ? master.restart() : master.paused(!master.paused())));
    const restart = document.createElement('button');
    restart.className = 'btn';
    restart.textContent = 'Restart';
    restart.addEventListener('click', () => master.restart());
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.001';
    slider.value = '0';
    slider.addEventListener('input', () => master.pause().progress(Number(slider.value)));
    master.eventCallback('onUpdate', () => {
      slider.value = String(master.progress());
    });
    row.append(play, restart, slider);
    el.append(row);
    cleanups.push(() => row.remove());
  }, el);

  return () => {
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;

// Scroll link(): one ScrollObserver, two animations, and only the last linked one follows the scroll
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from '../../shared/scroll-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { scroller, squares } = buildStage(el, preview, 2);
  const [a, b] = squares as [HTMLElement, HTMLElement];
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  // Two plain animations; neither gets an `autoplay` observer.
  const reach = preview ? '7rem' : '15rem';
  const animations = [
    animate(a, { x: reach, rotate: '1turn', ease: 'linear' }),
    animate(b, { y: '-3rem', scale: 1.5, ease: 'linear' }),
  ];

  const observer = onScroll({
    container: scroller,
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: !preview,
  });

  const buttons: HTMLButtonElement[] = [];
  let current = -1;
  const linkTo = (i: number): void => {
    current = i;
    // link() replaces whatever was linked before; the old one is left where it stopped.
    observer.link(animations[i]!);
    readout.textContent = `linked: ${i === 0 ? 'square 1 (x, rotate)' : 'square 2 (y, scale)'}`;
    buttons.forEach((btn, j) => btn.setAttribute('aria-pressed', String(j === i)));
  };

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    ['link(square 1)', 'link(square 2)'].forEach((text, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = text;
      btn.addEventListener('click', () => linkTo(i));
      buttons.push(btn);
      bar.append(btn);
    });
    el.prepend(bar);
  }

  linkTo(0);
  let timer = 0;
  let stopScroll = (): void => {};
  if (preview) {
    // Swap the linked animation each scroll period.
    stopScroll = autoScroll(scroller, 4000);
    timer = window.setInterval(() => linkTo(current === 0 ? 1 : 0), 4000);
  }

  return () => {
    window.clearInterval(timer);
    stopScroll();
    observer.revert();
    animations.forEach((anim) => anim.revert());
  };
};

export default mount;

// Scroll onResize: a counter that ticks whenever the observer's container changes size
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from '../../shared/scroll-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { scroller, squares } = buildStage(el, preview);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  let resizes = 0;
  const show = (): void => {
    readout.textContent = `resize ${resizes}\nheight ${Math.round(scroller.clientHeight)}px`;
  };
  show();

  const observer = onScroll({
    container: scroller,
    enter: 'bottom top',
    leave: 'center bottom',
    sync: 0.5,
    onResize: () => {
      resizes++;
      show();
    },
  });
  const animation = animate(squares, {
    x: preview ? '7rem' : '15rem',
    rotate: '1turn',
    ease: 'linear',
    autoplay: observer,
  });

  const cleanups: (() => void)[] = [];
  const baseHeight = preview ? 150 : 240;
  const setHeight = (h: number): void => {
    scroller.style.height = `${Math.round(h)}px`;
  };

  if (preview) {
    // Breathe the container height and scroll it, so the card shows resizes happening.
    cleanups.push(autoScroll(scroller, 6000));
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number): void => {
      setHeight(baseHeight - 40 + 40 * Math.cos((now - t0) / 700));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = 'container height ';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '100';
    slider.max = '320';
    slider.value = String(baseHeight);
    slider.addEventListener('input', () => setHeight(Number(slider.value)));
    label.append(slider);
    bar.append(label);
    el.append(bar);
  }

  return () => {
    cleanups.forEach((fn) => fn());
    observer.revert();
    animation.revert();
  };
};

export default mount;

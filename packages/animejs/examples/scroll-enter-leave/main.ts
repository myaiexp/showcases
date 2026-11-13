// Scroll onEnter and onLeave: counters that tick every time a threshold is crossed in the scroll container
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from '../../shared/scroll-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { scroller, squares } = buildStage(el, preview);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  let entered = 0;
  let exits = 0;
  const show = (): void => {
    readout.textContent = `entered ${entered}\nexits   ${exits}`;
  };
  show();

  const observer = onScroll({
    container: scroller,
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: !preview,
    onEnter: () => {
      entered++;
      show();
    },
    onLeave: () => {
      exits++;
      show();
    },
  });
  const animation = animate(squares, {
    x: preview ? '7rem' : '15rem',
    rotate: '1turn',
    ease: 'linear',
    autoplay: observer,
  });

  // The card has no pointer input, so it scrolls itself; the full view is yours to scroll.
  const stopScroll = preview ? autoScroll(scroller, 6000) : (): void => {};

  return () => {
    stopScroll();
    observer.revert();
    animation.revert();
  };
};

export default mount;

// Scroll observer properties: a live table of the values a ScrollObserver exposes while its container scrolls
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from '../../shared/scroll-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { scroller, squares, row } = buildStage(el, preview);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  const f = (n: number): string => n.toFixed(2);
  const draw = (o: ReturnType<typeof onScroll>): void => {
    const lines: [string, string][] = [
      ['progress', f(o.progress)],
      ['isInView', String(o.isInView)],
      ['velocity', f(o.velocity)],
      ['backward', String(o.backward)],
    ];
    if (!preview) {
      lines.push(
        ['scroll', f(o.scroll)],
        ['began', String(o.began)],
        ['completed', String(o.completed)],
        ['offsetStart', f(o.offsetStart)],
        ['offsetEnd', f(o.offsetEnd)],
        ['distance', f(o.distance)],
        ['enter', String(o.enter)],
        ['leave', String(o.leave)],
        ['sync', String(o.sync)],
        ['horizontal', String(o.horizontal)],
        ['repeat', String(o.repeat)],
      );
    }
    readout.textContent = lines.map(([k, v]) => `${k.padEnd(12)}${v}`).join('\n');
  };

  const observer = onScroll({
    container: scroller,
    target: row,
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: true,
    debug: !preview,
    onUpdate: draw,
  });
  const animation = animate(squares, {
    x: preview ? '7rem' : '15rem',
    rotate: '1turn',
    ease: 'linear',
    autoplay: observer,
  });
  draw(observer);

  const stopScroll = preview ? autoScroll(scroller, 6000) : (): void => {};

  return () => {
    stopScroll();
    observer.revert();
    animation.revert();
  };
};

export default mount;

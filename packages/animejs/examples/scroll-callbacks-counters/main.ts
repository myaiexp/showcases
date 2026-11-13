// ScrollObserver callbacks: counters for onEnter/onLeave per direction, onUpdate and onSyncComplete
import { animate, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from './stage.ts';
import './style.css';

const NAMES = ['onEnterForward', 'onEnterBackward', 'onLeaveForward', 'onLeaveBackward', 'onUpdate', 'onSyncComplete'] as const;
type Name = (typeof NAMES)[number];

const mount: Mount = (el, { preview }) => {
  // Counter tiles
  const counts = Object.fromEntries(NAMES.map(n => [n, 0])) as Record<Name, number>;
  const values = {} as Record<Name, HTMLElement>;
  const grid = document.createElement('div');
  grid.className = preview ? 'counters is-preview' : 'counters';
  for (const name of NAMES) {
    const tile = document.createElement('div');
    tile.className = 'counter';
    const label = document.createElement('span');
    label.className = 'name';
    label.textContent = name;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = '0';
    values[name] = value;
    tile.append(label, value);
    grid.append(tile);
  }
  el.append(grid);
  const bump = (name: Name) => (): void => {
    values[name].textContent = String(++counts[name]);
  };

  const { scroller, square } = buildStage(el, preview);

  // The ScrollObserver and its callbacks
  const observer = onScroll({
    container: scroller,
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 0.5,
    debug: !preview,
    onEnterForward: bump('onEnterForward'),
    onEnterBackward: bump('onEnterBackward'),
    onLeaveForward: bump('onLeaveForward'),
    onLeaveBackward: bump('onLeaveBackward'),
    onUpdate: bump('onUpdate'),
    onSyncComplete: bump('onSyncComplete'),
  });
  const animation = animate(square, {
    x: preview ? '7rem' : '15rem',
    rotate: '1turn',
    ease: 'linear',
    autoplay: observer,
  });

  let stopScroll = (): void => {};
  if (preview) {
    stopScroll = autoScroll(scroller, 6000);
  } else {
    const actions = document.createElement('div');
    actions.className = 'actions';
    const make = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      actions.append(b);
    };
    make('Scroll to top', () => scroller.scrollTo({ top: 0, behavior: 'smooth' }));
    make('Scroll to bottom', () => scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' }));
    make('Reset counters', () => {
      for (const n of NAMES) {
        counts[n] = 0;
        values[n].textContent = '0';
      }
    });
    el.append(actions);
  }

  return () => {
    stopScroll();
    observer.revert();
    animation.revert();
  };
};

export default mount;

// Scroll refresh() and revert(): function-based thresholds re-computed on demand, then the observer is switched off
import { animate, onScroll, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import { autoScroll, buildStage } from '../../shared/scroll-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { scroller, squares } = buildStage(el, preview);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(readout);

  const settings = { enter: 20, leave: 60 };
  let observer: ReturnType<typeof onScroll> | undefined;
  let animation: ReturnType<typeof animate> | undefined;
  let tween: ReturnType<typeof animate> | undefined;
  let refreshes = 0;
  let active = false;
  let lastKey = '';

  const show = (): void => {
    readout.textContent =
      `enter: bottom-=${settings.enter} top\nleave: top+=${settings.leave} bottom\n` +
      `refresh() calls ${refreshes}\nobserver ${active ? 'active' : 'reverted (scroll does nothing)'}`;
  };

  const build = (): void => {
    // Function-based enter/leave are the values refresh() re-computes.
    observer = onScroll({
      container: scroller,
      enter: () => `bottom-=${settings.enter} top`,
      leave: () => `top+=${settings.leave} bottom`,
      sync: 0.5,
      debug: !preview,
    });
    animation = animate(squares, {
      x: preview ? '7rem' : '15rem',
      rotate: '1turn',
      ease: 'linear',
      autoplay: observer,
    });
    // Move the thresholds and ask the observer to compute them again.
    tween = animate(settings, {
      enter: 90,
      leave: 100,
      loop: true,
      alternate: true,
      duration: 3000,
      modifier: utils.round(0),
      onUpdate: () => {
        // Rounded values only change in steps; refresh only when they did.
        const key = `${settings.enter}/${settings.leave}`;
        if (key === lastKey) return;
        lastKey = key;
        observer?.refresh();
        refreshes++;
        show();
      },
    });
    active = true;
    show();
  };

  const teardown = (): void => {
    tween?.revert();
    observer?.revert();
    animation?.revert();
    tween = observer = animation = undefined;
    lastKey = '';
    active = false;
  };

  const bar = document.createElement('div');
  bar.className = 'bar';
  const addButton = (text: string, fn: () => void): void => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = text;
    btn.addEventListener('click', fn);
    bar.append(btn);
  };
  if (!preview) {
    addButton('revert()', () => {
      if (!observer) return;
      // Disables the observer, drops its listeners and removes the debug markers.
      observer.revert();
      tween?.pause();
      active = false;
      show();
    });
    addButton('Rebuild', () => {
      teardown();
      refreshes = 0;
      build();
    });
    el.prepend(bar);
  }

  build();
  const stopScroll = preview ? autoScroll(scroller, 6000) : (): void => {};

  return () => {
    stopScroll();
    teardown();
  };
};

export default mount;

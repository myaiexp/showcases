// ScrollObserver repeat on and off: two timers whose observers differ only in `repeat`
import { createTimer, onScroll } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const el$ = (cls: string, text?: string, tag = 'div'): HTMLElement => {
  const d = document.createElement(tag);
  d.className = cls;
  if (text) d.textContent = text;
  return d;
};

const mount: Mount = (el, { preview }) => {
  const scroller = el$(preview ? 'scroller is-preview' : 'scroller');
  const content = el$('content');
  const makeTile = (cls: string, label: string): { tile: HTMLElement; value: HTMLElement } => {
    const tile = el$(`tile ${cls}`);
    const value = el$('value', '0', 'span');
    tile.append(el$('name', label, 'span'), value);
    const row = el$('section');
    row.append(tile);
    content.append(row);
    return { tile, value };
  };
  content.append(el$('section', 'scroll down'));
  const rep = makeTile('repeat', 'repeat: true updates');
  const noRep = makeTile('no-repeat', 'repeat: false updates');
  content.append(el$('section', 'scroll back up'));
  scroller.append(content);
  el.append(scroller);

  let revertibles: { revert(): unknown }[] = [];
  const build = (): void => {
    revertibles.forEach(r => r.revert());
    rep.value.textContent = '0';
    noRep.value.textContent = '0';
    let repeatUpdates = 0;
    let noRepeatUpdates = 0;
    const repeatObserver = onScroll({
      container: scroller,
      target: rep.tile,
      enter: 'bottom-=40 top',
      leave: 'top+=60 bottom',
      repeat: true,
      debug: !preview,
    });
    const noRepeatObserver = onScroll({
      container: scroller,
      target: noRep.tile,
      enter: 'bottom-=40 top',
      leave: 'top+=60 bottom',
      repeat: false,
      debug: !preview,
    });
    const t1 = createTimer({
      duration: 1000,
      onUpdate: () => (rep.value.textContent = String(repeatUpdates++)),
      autoplay: repeatObserver,
    });
    const t2 = createTimer({
      duration: 1000,
      onUpdate: () => (noRep.value.textContent = String(noRepeatUpdates++)),
      autoplay: noRepeatObserver,
    });
    revertibles = [repeatObserver, noRepeatObserver, t1, t2];
  };
  build();

  let raf = 0;
  let cycle = 0;
  if (preview) {
    // Scroll through both tiles, then rebuild the observers each pass so the contrast repeats.
    const period = 8000;
    const start = performance.now();
    const tick = (now: number): void => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      scroller.scrollTop = ((1 - Math.cos(((now - start) / period) * Math.PI * 2)) / 2) * max;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cycle = window.setInterval(build, period);
  } else {
    const actions = el$('actions');
    const b = el$('btn', 'Rebuild both observers', 'button');
    b.addEventListener('click', build);
    actions.append(b);
    el.append(actions);
  }

  return () => {
    window.clearInterval(cycle);
    cancelAnimationFrame(raf);
    revertibles.forEach(r => r.revert());
  };
};

export default mount;

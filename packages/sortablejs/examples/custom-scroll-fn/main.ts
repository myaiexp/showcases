// A long agenda with a drawn scrollbar: scrollFn does the scrolling and moves the thumb
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const MEETINGS = ['Stand-up', 'Design review', 'Budget check', '1:1 with Sam', 'Roadmap sync', 'Customer call', 'Retro', 'Lunch & learn'];

const mount: Mount = (el, { preview, signal }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const box = document.createElement('div');
  box.className = 'agenda'; // a normal overflow box whose native scrollbar is hidden
  if (!preview) box.style.height = '300px';
  const list = document.createElement('ul');
  list.className = 'meetings';
  for (let i = 0; i < 36; i++) {
    const li = document.createElement('li');
    li.className = 'meeting';
    const hour = 8 + Math.floor(i / 2);
    li.innerHTML = '<time></time><span></span>';
    li.querySelector('time')!.textContent = `${String(hour % 24).padStart(2, '0')}:${i % 2 ? '30' : '00'}`;
    li.querySelector('span')!.textContent = MEETINGS[i % MEETINGS.length]!;
    list.append(li);
  }
  box.append(list);
  // The scrollbar is our own: a rail and a thumb.
  const rail = document.createElement('div');
  rail.className = 'rail';
  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  rail.append(thumb);
  frame.append(box, rail);
  el.append(frame);

  const placeThumb = (): void => {
    const room = box.scrollHeight - box.clientHeight;
    const size = Math.max(24, (box.clientHeight / box.scrollHeight) * rail.clientHeight);
    thumb.style.height = `${size}px`;
    thumb.style.transform = `translateY(${room ? (box.scrollTop / room) * (rail.clientHeight - size) : 0}px)`;
  };
  box.addEventListener('scroll', placeThumb);
  placeThumb();

  let calls = 0;
  let turbo = true;
  let note: HTMLElement | null = null;
  // Called instead of the built-in scrolling, every 24 ms while the pointer is in the edge zone.
  // The fifth argument is the element Sortable would have scrolled: the AutoScroll README calls it
  // hoverTargetEl, but 1.15.7 passes the scroll container here (autoScrolls[layer].el in the source).
  // Returning 'continue' lets the built-in scroll run too.
  const scrollFn: NonNullable<Sortable.Options['scrollFn']> = (offsetX, offsetY, _evt, _touchEvt, scrollEl) => {
    calls++;
    scrollEl.scrollTop += offsetY * 3; // our own rule: three times the usual distance
    placeThumb();
    if (note) note.textContent = `scrollFn called ${calls} times, last step ${offsetY * 3} px`;
    return undefined;
  };

  const sortable = Sortable.create(list, {
    animation: 150,
    scroll: box,
    // A scripted (touch) drag only reaches the autoscroll in fallback mode, so cards create the list with forceFallback.
    forceFallback: preview,
    forceAutoScrollFallback: true, // scrollFn only runs when Sortable's own autoscroll does
    scrollFn,
    scrollSpeed: 6,
  });

  if (preview) {
    let down = true;
    loopDrive(el, signal, async (hand) => {
      const at = el.getBoundingClientRect();
      const rows = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const b = box.getBoundingClientRect();
      const item = (down ? rows : rows.reverse()).find((r) => r.getBoundingClientRect().top > b.top + 2 && r.getBoundingClientRect().bottom < b.bottom - 2)!;
      const r = item.getBoundingClientRect();
      hand.down(item);
      await hand.glide({ x: r.left - at.left + 40, y: r.top - at.top + r.height / 2 + 4 }, 0.08);
      await hand.glide({ el: box, fx: 0.5, fy: down ? 0.93 : 0.07 }, 0.8);
      await hand.wait(1.5);
      await hand.glide({ el: box, fx: 0.5, fy: 0.5 }, 0.4);
      hand.up();
      down = !down;
    }, 0.6, { autoScroll: true });
  } else {
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 0 4px';
    checkbox(bar, 'Use our scrollFn (off: Sortable scrolls normally)', true, (on) => {
      turbo = on;
      sortable.option('scrollFn', on ? scrollFn : undefined);
      if (note) note.textContent = turbo ? 'scrollFn on' : 'built-in scrolling';
    });
    note = readout(bar, 'drag a meeting to the bottom edge');
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'The scrollbar on the right is drawn by us and the real one is hidden. scrollFn scrolls at triple speed and moves the thumb, because Sortable hands it the distance instead of scrolling.';
    el.append(bar, hint);
  }

  return () => release(sortable);
};

export default mount;

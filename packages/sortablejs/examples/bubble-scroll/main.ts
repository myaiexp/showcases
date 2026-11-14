// A task widget inside a scrolling page: dragging near the bottom can scroll both at once
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TASKS = ['Book the venue', 'Send invitations', 'Order the cake', 'Hire a DJ', 'Print menus', 'Buy balloons', 'Confirm caterer', 'Make a playlist', 'Pick up flowers', 'Test the projector'];

const mount: Mount = (el, { preview, signal }) => {
  // Outer box: the page. Inner box: the widget's own scrolling list. Below the widget the page goes on.
  const page = document.createElement('div');
  page.className = 'page';
  page.innerHTML =
    '<p class="intro">Party plan</p>' +
    '<section class="widget"><h3>Checklist</h3><div class="inner"><ul class="tasks"></ul></div></section>' +
    '<div class="tail">More of the page continues down here...</div>';
  const inner = page.querySelector<HTMLElement>('.inner')!;
  const list = page.querySelector<HTMLElement>('.tasks')!;
  for (let i = 0; i < 20; i++) {
    const li = document.createElement('li');
    li.className = 'task';
    li.textContent = `${TASKS[i % TASKS.length]}${i >= TASKS.length ? ' (again)' : ''}`;
    list.append(li);
  }
  if (preview) page.classList.add('flat'); // cards show the inner box only: bubbling is off there
  el.append(page);

  const sortable = Sortable.create(list, {
    animation: 150,
    // A scripted (touch) drag only reaches the autoscroll in fallback mode, so cards create the list with forceFallback.
    forceFallback: preview,
    forceAutoScrollFallback: true,
    // true: the scrolling also applies to every scrollable parent of the box under the pointer,
    // each judged by its own edge. false: only the nearest box scrolls.
    bubbleScroll: true,
    scrollSensitivity: 50, // a wide edge zone, so the checklist's and the page's zones overlap
  });

  if (preview) {
    let down = true;
    loopDrive(el, signal, async (hand) => {
      const at = el.getBoundingClientRect();
      const rows = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const box = inner.getBoundingClientRect();
      const item = (down ? rows : rows.reverse()).find((r) => r.getBoundingClientRect().top > box.top + 2 && r.getBoundingClientRect().bottom < box.bottom - 2)!;
      const r = item.getBoundingClientRect();
      hand.down(item);
      await hand.glide({ x: r.left - at.left + 30, y: r.top - at.top + r.height / 2 + 4 }, 0.08);
      await hand.glide({ el: inner, fx: 0.5, fy: down ? 0.92 : 0.08 }, 0.8);
      await hand.wait(1.6);
      await hand.glide({ el: inner, fx: 0.5, fy: 0.5 }, 0.4);
      hand.up();
      down = !down;
    }, 0.6, { autoScroll: true });
  } else {
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 18px;justify-content:center;padding:10px 0 4px';
    checkbox(bar, 'bubbleScroll', true, (on) => sortable.option('bubbleScroll', on));
    const state = readout(bar);
    const show = (): void => {
      state.textContent = `page scrolled ${Math.round(page.scrollTop)} px, checklist scrolled ${Math.round(inner.scrollTop)} px`;
    };
    page.addEventListener('scroll', show);
    inner.addEventListener('scroll', show);
    show();
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a task to the very bottom of the grey page, where the checklist ends. With bubbleScroll on, the page scrolls along with the checklist; off, only the checklist moves.';
    el.append(bar, hint);
  }

  return () => release(sortable);
};

export default mount;

// A parcel queue where sliders set how close to the edge scrolling starts and how fast it goes
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const CITIES = ['Oslo', 'Lima', 'Kyoto', 'Cairo', 'Porto', 'Quito', 'Hanoi', 'Accra', 'Tunis', 'Perth'];
const PERF = 1000 / 24; // the plugin scrolls once every 24 ms, `scrollSpeed` px at a time

const mount: Mount = (el, { preview, signal }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const box = document.createElement('div');
  box.className = 'queue';
  if (!preview) box.style.height = '300px';
  const list = document.createElement('ul');
  list.className = 'parcels';
  for (let i = 0; i < 40; i++) {
    const li = document.createElement('li');
    li.className = 'parcel';
    li.innerHTML = '<b></b><span></span>';
    li.querySelector('b')!.textContent = `#${1040 + i}`;
    li.querySelector('span')!.textContent = `to ${CITIES[(i * 3) % CITIES.length]}`;
    list.append(li);
  }
  box.append(list);
  // Two bands drawn over the box show where scrolling starts: they are exactly `scrollSensitivity` px tall.
  const top = Object.assign(document.createElement('div'), { className: 'zone top' });
  const bottom = Object.assign(document.createElement('div'), { className: 'zone bottom' });
  const tag = Object.assign(document.createElement('div'), { className: 'tag' });
  frame.append(box, top, bottom, tag);
  el.append(frame);

  const settings = { sens: 30, speed: 10 };
  const sortable = Sortable.create(list, {
    animation: 150,
    scroll: box,
    // A scripted (touch) drag only reaches the autoscroll in fallback mode, so cards create the list with forceFallback.
    forceFallback: preview,
    forceAutoScrollFallback: true,
    scrollSensitivity: settings.sens, // px from the edge where scrolling starts
    scrollSpeed: settings.speed, // px per tick once it has started
  });

  const apply = (): void => {
    sortable.option('scrollSensitivity', settings.sens);
    sortable.option('scrollSpeed', settings.speed);
    top.style.height = bottom.style.height = `${settings.sens}px`;
    tag.textContent = `zone ${settings.sens}px, about ${Math.round(settings.speed * PERF)} px/s`;
  };
  apply();

  if (preview) {
    // Round 1: a thin zone and a slow speed, pointer inside it. Round 2: a wide zone, fast, pointer well away from the edge.
    const rounds = [
      { sens: 22, speed: 5, inset: 11, down: true },
      { sens: 70, speed: 20, inset: 45, down: false },
    ];
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const round = rounds[turn++ % rounds.length]!;
      settings.sens = round.sens;
      settings.speed = round.speed;
      apply();
      const at = el.getBoundingClientRect();
      const rows = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const item = rows.find((r) => r.getBoundingClientRect().top > box.getBoundingClientRect().top + 8)!;
      const r = item.getBoundingClientRect();
      const h = box.getBoundingClientRect().height;
      hand.down(item);
      await hand.glide({ x: r.left - at.left + 30, y: r.top - at.top + r.height / 2 + 4 }, 0.08);
      await hand.glide({ el: box, fx: 0.5, fy: round.down ? 1 - round.inset / h : round.inset / h }, 0.8);
      await hand.wait(1.7);
      await hand.glide({ el: box, fx: 0.5, fy: 0.5 }, 0.4);
      hand.up();
    }, 0.5, { autoScroll: true });
  } else {
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 20px;justify-content:center;padding:10px 0 4px';
    slider(bar, 'Edge zone', 5, 120, 5, settings.sens, (v) => {
      settings.sens = v;
      apply();
    }, (v) => `${v}px`);
    slider(bar, 'Speed', 1, 40, 1, settings.speed, (v) => {
      settings.speed = v;
      apply();
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a parcel into a shaded band and hold it there. A wider band starts scrolling sooner; a higher speed scrolls faster.';
    el.append(bar, hint);
  }

  return () => release(sortable);
};

export default mount;

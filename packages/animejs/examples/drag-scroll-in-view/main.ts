// scrollInView(): scrolls the container just far enough to bring a draggable placed outside the viewport into view
import { createDraggable } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const SPOTS: Array<[number, number]> = [[120, 200], [420, 90], [240, 380], [560, 330]];

const mount: Mount = (el, { preview }) => {
  const scroller = document.createElement('div');
  scroller.className = 'scroller';
  const content = document.createElement('div');
  content.className = 'content';
  const item = document.createElement('div');
  item.className = 'item';
  content.append(item);
  scroller.append(content);
  el.append(scroller);

  const d = createDraggable(item, { container: scroller });

  const readout = document.createElement('div');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = `square at x: ${Math.round(d.x)} y: ${Math.round(d.y)}   scrollLeft: ${Math.round(scroller.scrollLeft)}  scrollTop: ${Math.round(scroller.scrollTop)}`;
  };
  scroller.addEventListener('scroll', show);

  let duration = 400;
  let gap = 100;
  let n = 0;
  // Put the square somewhere outside the visible part, then bring the scroll position to it.
  const place = (): void => {
    d.stop();
    scroller.scrollTo(0, 0);
    const [x, y] = SPOTS[n++ % SPOTS.length]!;
    d.x = x;
    d.y = y;
    show();
  };
  const bringIntoView = (): void => {
    d.scrollInView(duration, gap);
  };

  const timeouts = new Set<number>();
  let timer = 0;
  if (preview) {
    const cycle = (): void => {
      place();
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        d.scrollInView(700, 30);
      }, 700);
      timeouts.add(id);
    };
    cycle();
    timer = window.setInterval(cycle, 2600);
  } else {
    place();
    const panel = document.createElement('div');
    panel.className = 'panel';
    const slider = (name: string, max: number, step: number, initial: number, set: (v: number) => void): void => {
      const label = document.createElement('label');
      label.className = 'label';
      label.textContent = `${name} `;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '0';
      input.max = String(max);
      input.step = String(step);
      input.value = String(initial);
      input.addEventListener('input', () => set(Number(input.value)));
      label.append(input);
      panel.append(label);
    };
    slider('duration', 1500, 50, duration, (v) => (duration = v));
    slider('gap', 150, 10, gap, (v) => (gap = v));
    const add = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      panel.append(b);
    };
    add('Place square out of view', place);
    add('scrollInView()', bringIntoView);
    el.append(panel, readout);
  }

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    scroller.removeEventListener('scroll', show);
    d.revert();
  };
};

export default mount;

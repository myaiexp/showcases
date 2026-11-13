// reversed on a timer: currentTime still counts up while iterationCurrentTime runs backwards
import { createTimer } from 'animejs';
import type { Timer } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const cols = document.createElement('div');
  cols.className = 'cols';
  el.append(cols);

  const column = (reversed: boolean) => {
    const col = document.createElement('div');
    col.className = 'col';
    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = `reversed: ${reversed}`;
    const makeRow = (label: string) => {
      const row = document.createElement('div');
      row.className = 'row';
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = label;
      const bar = document.createElement('div');
      bar.className = 'bar';
      const fill = document.createElement('div');
      fill.className = 'fill';
      bar.append(fill);
      const value = document.createElement('span');
      value.className = 'value';
      row.append(name, bar, value);
      col.append(row);
      return { fill, value };
    };
    col.prepend(title);
    const iter = makeRow('iteration');
    const cur = makeRow('current');
    cols.append(col);
    const duration = 4000;
    const timer: Timer = createTimer({
      duration,
      reversed,
      loop: true,
      onUpdate: (self) => {
        iter.fill.style.transform = `scaleX(${self.iterationCurrentTime / duration})`;
        cur.fill.style.transform = `scaleX(${self.currentTime / duration})`;
        iter.value.textContent = String(Math.round(self.iterationCurrentTime));
        cur.value.textContent = String(Math.round(self.currentTime));
      },
    });
    return timer;
  };
  const timers = [column(false), column(true)];
  if (!preview) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'currentTime always runs from 0 to duration. Only iterationCurrentTime is reversed.';
    el.append(note);
  }

  return () => timers.forEach((t) => t.revert());
};

export default mount;

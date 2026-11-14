// A scroll inspector: every number scroll() reports in its info argument, live, for both axes
import { scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const FIELDS = ['current', 'offset', 'progress', 'scrollLength', 'velocity'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="inspector">
      <div class="scroller"><div class="map"></div></div>
      <table>
        <thead><tr><th></th><th>x</th><th>y</th></tr></thead>
        <tbody></tbody>
        <tfoot><tr><th>time</th><td colspan="2" class="time"></td></tr></tfoot>
      </table>
    </div>`;
  el.querySelector('.inspector')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const cells = new Map<string, HTMLElement>();
  for (const field of FIELDS) {
    const row = document.createElement('tr');
    const name = document.createElement('th');
    name.textContent = field;
    row.append(name);
    for (const axis of ['x', 'y']) {
      const td = document.createElement('td');
      cells.set(`${axis}.${field}`, td);
      row.append(td);
    }
    el.querySelector('tbody')!.append(row);
  }
  const time = el.querySelector<HTMLElement>('.time')!;
  if (!preview) hint(el, 'Scroll the map in both directions. The callback receives (progress, info): current is the scroll position, offset the range in pixels, progress runs 0 to 1 within it, scrollLength is how far the panel can scroll, and velocity is pixels per second.');

  const scope = scopeMotion(el, () => {
    scroll((_progress, info) => {
      for (const axis of ['x', 'y'] as const) {
        const a = info[axis];
        const set = (field: string, v: string): void => {
          cells.get(`${axis}.${field}`)!.textContent = v;
        };
        set('current', String(Math.round(a.current)));
        set('offset', a.offset.map((n) => Math.round(n)).join('..'));
        set('progress', a.progress.toFixed(2));
        set('scrollLength', String(Math.round(a.scrollLength)));
        set('velocity', String(Math.round(a.velocity)));
      }
      time.textContent = `${Math.round(info.time)} ms`;
    }, { container: scroller });

    if (preview) {
      autoScroll(scroller, { duration: 5 });
      autoScroll(scroller, { axis: 'x', duration: 3.3 });
    }
  });
  return () => scope.cancel();
};

export default mount;

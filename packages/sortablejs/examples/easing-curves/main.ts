// Four lanes of tokens that slide with different easing curves when the order changes
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, button } from '../../shared/controls.ts';
import './style.css';

const CURVES: [string, string, [number, number, number, number]][] = [
  ['Linear', 'linear', [0, 0, 1, 1]],
  ['Ease out', 'cubic-bezier(0, 0, 0.2, 1)', [0, 0, 0.2, 1]],
  ['Snap', 'cubic-bezier(1, 0, 0, 1)', [1, 0, 0, 1]],
  ['Overshoot', 'cubic-bezier(0.34, 1.56, 0.64, 1)', [0.34, 1.56, 0.64, 1]],
];
const HUES = [10, 40, 120, 200, 270];

/** A little graph of the curve: time runs left to right, progress bottom to top. */
function curveSvg([x1, y1, x2, y2]: [number, number, number, number]): string {
  const [w, h] = [30, 20];
  const d = `M0 ${h} C ${x1 * w} ${h - y1 * h}, ${x2 * w} ${h - y2 * h}, ${w} 0`;
  return `<svg viewBox="-2 -10 ${w + 4} ${h + 20}" width="34" height="32"><path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2"/></svg>`;
}

const mount: Mount = (el, { preview, signal }) => {
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  const lists = CURVES.map(([name, , bezier]) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    lane.innerHTML = `${curveSvg(bezier)}<span class="name"></span><ul class="list"></ul>`;
    lane.querySelector('.name')!.textContent = name;
    const list = lane.querySelector('ul')!;
    HUES.slice(0, preview ? 4 : 5).forEach((hue, i) => {
      const token = document.createElement('li');
      token.className = 'token';
      token.dataset['id'] = String(i + 1);
      token.style.background = `hsl(${hue} 70% 55%)`;
      list.append(token);
    });
    lanes.append(lane);
    return list;
  });
  el.append(lanes);

  // `easing` is the CSS timing function for the slide. A slow 700 ms makes each curve readable.
  const sortables = lists.map((list, i) =>
    Sortable.create(list, { animation: 700, easing: CURVES[i]![1] }),
  );
  const reverse = (): void => {
    const order = sortables[0]!.toArray().reverse();
    for (const s of sortables) s.sort(order, true);
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(reverse, 1900);
    signal.addEventListener('abort', () => window.clearInterval(timer), { once: true });
  } else {
    const controls = bar(el);
    el.prepend(controls);
    button(controls, 'Reverse all lanes', reverse);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Each lane is one easing curve. Drag a token sideways in any lane to see the same curve at work.';
    el.append(hint);
  }

  return () => {
    window.clearInterval(timer);
    release(...sortables);
  };
};

export default mount;

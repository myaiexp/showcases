// A map with three pins whose labels differ only in their arrow
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const SVG = 'http://www.w3.org/2000/svg';

/** A hook-shaped arrow, 16 by 6 like the built-in round one. */
function hookArrow(): SVGSVGElement {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '6');
  const path = document.createElementNS(SVG, 'path');
  path.setAttribute('d', 'M0 6 C5 6 6 5 8 0 C10 5 11 6 16 6 Z');
  svg.append(path);
  return svg;
}

const PINS = [
  { name: 'Café Nord', note: 'with the standard arrow', arrow: true as boolean | SVGSVGElement },
  { name: 'Library', note: 'no arrow', arrow: false },
  { name: 'Old Pier', note: 'a hand-drawn arrow', arrow: hookArrow() },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 270, hint: 'Hover the three pins.' });

  const pins = PINS.map((p, i) => {
    const pin = document.createElement('button');
    pin.className = 'pin';
    pin.style.left = `${18 + i * 30}%`;
    pin.textContent = '📍';
    pin.setAttribute('aria-label', p.name);
    const cap = document.createElement('span');
    cap.className = 'note';
    cap.style.left = `${18 + i * 30}%`;
    cap.textContent = p.note;
    stage.root.append(pin, cap);
    stage.own(tippy(pin, { content: p.name, arrow: p.arrow, placement: 'top', appendTo: stage.root }));
    return pin;
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const pin of pins) {
        await stage.ghost.hover(pin, 550);
        await wait(1100);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;

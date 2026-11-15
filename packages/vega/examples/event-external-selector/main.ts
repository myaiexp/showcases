// A CSS selector as the event source: clicks on buttons that live outside the view
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';
import { button } from '../../shared/controls.ts';

let serial = 0;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The selector is resolved when the view is created, so the buttons must exist first.
  // Full view: in the control bar. Cards: hidden, and clicked by the card's own timer.
  const id = ++serial;
  const holder = stage.bar ?? el.appendChild(document.createElement('div'));
  holder.hidden = !stage.bar;
  // A card sits inside a link; a scripted click must not bubble up and open the example.
  if (!stage.bar) holder.addEventListener('click', (e) => e.stopPropagation());
  const more = button(holder, 'More', () => undefined);
  const less = button(holder, 'Less', () => undefined);
  more.id = `vega-more-${id}`;
  less.className = `vega-less-${id}`;
  stage.own(() => {
    more.remove();
    less.remove();
    if (!stage.bar) holder.remove();
  });

  const spec: Spec = {
    width: 420,
    height: 100,
    padding: 5,

    signals: [
      {
        name: 'n',
        value: 3,
        on: [
          // "#id:click" and ".class:click": the source is a CSS selector string.
          { events: `#${more.id}:click`, update: 'min(n + 1, 12)' },
          { events: `.vega-less-${id}:click`, update: 'max(n - 1, 0)' },
        ],
      },
    ],

    data: [{ name: 'dots', transform: [{ type: 'sequence', start: 0, stop: { signal: 'n' }, as: 'i' }] }],

    marks: [
      line("'n = ' + n + '   (buttons outside the view change it)'", 4),
      {
        type: 'symbol',
        from: { data: 'dots' },
        encode: { update: { x: { signal: '24 + datum.i * 34' }, y: { value: 70 }, size: { value: 700 }, fill: { value: 'steelblue' } } },
      },
    ],
  };

  await stage.render(spec);
  if (stage.preview) stage.every(700, (i) => ((i % 8 < 4 ? more : less).click()));
  return () => stage.dispose();
};

export default mount;

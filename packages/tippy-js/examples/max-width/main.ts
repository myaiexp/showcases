// A footnote with a long explanation, shown with three different width limits
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import './style.css';

const LONG =
  'Median commute is measured door to door and leaves out remote days. The figures come from the regional travel survey of twelve thousand households.';
// Cards are narrow, so they use a shorter note and smaller limits to show the same contrast.
const SHORT = 'Measured door to door.';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover each marker, or drag the slider and hover the last one.' });
  const text = stage.preview ? SHORT : LONG;

  const para = document.createElement('p');
  para.className = 'para';
  para.textContent = 'The average commute is 31 minutes.';
  const markers = document.createElement('div');
  markers.className = 'markers';
  const make = (label: string): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = label;
    markers.append(b);
    return b;
  };
  stage.root.append(para, markers);

  const variants = stage.preview
    ? ([['Wide', 'none'], ['Narrow', 150], ['Narrower', 110]] as const)
    : ([['Default (350)', 350], ['Narrower (200)', 200], ['No limit', 'none']] as const);
  const buttons = variants.map(([label, maxWidth]) => {
    const b = make(label);
    stage.own(tippy(b, { content: text, maxWidth, placement: 'bottom', appendTo: stage.root }));
    return b;
  });

  if (stage.bar) {
    const own = make('Your width');
    const tip = stage.own(tippy(own, { content: text, maxWidth: 260, placement: 'bottom', appendTo: stage.root }));
    slider(stage.bar, 'maxWidth', 100, 600, 10, 260, (v) => tip.setProps({ maxWidth: v }), (v) => `${v}px`);
  } else {
    stage.play(async (wait) => {
      for (const b of buttons) {
        await stage.ghost.hover(b, 500);
        await wait(1300);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;

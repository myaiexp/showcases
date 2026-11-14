// A colour picker element inside a tip: it keeps its listeners and recolours the page
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const HUES = [0, 35, 130, 200, 280];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Click the button, pick a swatch or drag the slider.' });

  const heading = document.createElement('h2');
  heading.className = 'heading';
  heading.textContent = 'Quarterly report';
  const trigger = document.createElement('button');
  trigger.className = 'btn btn-primary trigger';
  trigger.textContent = 'Heading colour';
  stage.root.append(trigger, heading);

  const paint = (hue: number): void => {
    heading.style.color = `hsl(${hue} 80% 65%)`;
  };
  paint(200);

  // A real element with its own listeners, not a string: the listeners survive.
  const picker = document.createElement('div');
  picker.className = 'picker';
  const row = document.createElement('div');
  row.className = 'swatches';
  const slider = document.createElement('input');
  Object.assign(slider, { type: 'range', min: '0', max: '360', value: '200' });
  slider.addEventListener('input', () => paint(Number(slider.value)));
  const swatches = HUES.map((hue) => {
    const s = document.createElement('button');
    s.className = 'swatch';
    s.style.background = `hsl(${hue} 80% 65%)`;
    s.addEventListener('click', () => {
      slider.value = String(hue);
      paint(hue);
    });
    row.append(s);
    return s;
  });
  picker.append(row, slider);

  stage.own(
    tippy(trigger, {
      content: picker,
      trigger: 'click',
      interactive: true,
      placement: 'bottom',
      appendTo: stage.root,
    }),
  );

  if (stage.preview) {
    let n = 0;
    stage.play(async (wait) => {
      await stage.ghost.click(trigger, 700);
      await wait(500);
      await stage.ghost.click(swatches[n++ % HUES.length], 600);
      await wait(500);
      await stage.ghost.moveTo(slider, 500);
      for (const v of [60, 140, 250, 330]) {
        slider.value = String(v);
        slider.dispatchEvent(new Event('input'));
        await wait(260);
      }
      await wait(500);
      await stage.ghost.click(trigger, 600);
      await wait(900);
    });
  }

  return stage.dispose;
};

export default mount;

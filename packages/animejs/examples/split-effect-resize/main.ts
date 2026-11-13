// Line animation kept alive across reflows by split.addEffect()
import { animate, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { slider } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const stage = document.createElement('div');
  stage.className = 'stage';
  const frame = document.createElement('div');
  frame.className = 'frame';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent =
    'Lines are measured after layout, so when the box gets narrower the same words fall into new lines and the effect starts over on them.';
  frame.append(p);
  stage.append(frame);
  const readout = document.createElement('div');
  readout.className = 'readout';
  el.append(stage);

  const split = splitText(p, { lines: { wrap: 'clip' }, words: false });
  let runs = 0;
  split.addEffect(({ lines }) => {
    runs += 1;
    readout.textContent = `${lines.length} lines · effect ran ${runs}x`;
    return animate(lines, {
      y: ['100%', '0%'],
      duration: 700,
      ease: 'out(3)',
      delay: stagger(160),
      loop: true,
      loopDelay: 1200,
      alternate: true,
    });
  });

  let timer = 0;
  if (preview) {
    let wide = false;
    frame.style.width = '100%';
    timer = window.setInterval(() => {
      wide = !wide;
      frame.style.width = wide ? '100%' : '70%';
    }, 2600);
  } else {
    frame.classList.add('free');
    const controls = document.createElement('div');
    controls.className = 'controls';
    el.append(controls, readout);
    slider(controls, 'width (%)', { min: 35, max: 100, step: 1, value: 100 }, (v) => {
      frame.style.width = `${v}%`;
    });
  }

  return () => {
    window.clearInterval(timer);
    split.revert();
    el.replaceChildren();
  };
};

export default mount;

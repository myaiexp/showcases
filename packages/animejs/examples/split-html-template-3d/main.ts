// Template-split characters into three-faced blocks and tumble them with a timeline
import { createTimeline, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { slider } from './ui.ts';
import './style.css';

// {value} becomes the character, {i} its index. Display styles are added by the library.
const TEMPLATE = `<span class="char-3d char-{i}">
  <em class="face face-top">{value}</em>
  <em class="face-front">{value}</em>
  <em class="face face-bottom">{value}</em>
</span>`;

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Flip the text';
  stage.append(p);
  el.append(stage);

  const split = splitText(p, { chars: TEMPLATE });
  const blocks = p.querySelectorAll('.char-3d');
  const tops = p.querySelectorAll('.face-top');
  const fronts = p.querySelectorAll('.face-front');

  let tl: ReturnType<typeof createTimeline> | undefined;
  const build = (gap: number): void => {
    tl?.revert();
    const each = stagger(gap, { start: 0 });
    tl = createTimeline({ defaults: { ease: 'linear', duration: 750, loop: true } })
      .add(blocks, { rotateX: -90 }, each)
      // The top face rolls into view as the front rolls away, so the shading runs the same way.
      .add(tops, { opacity: [0.5, 1] }, each)
      .add(fronts, { opacity: [1, 0.5] }, each);
  };
  build(100);

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    el.append(controls);
    slider(controls, 'stagger (ms)', { min: 20, max: 300, step: 10, value: 100 }, build);
  }

  return () => {
    tl?.revert();
    split.revert();
    el.replaceChildren();
  };
};

export default mount;

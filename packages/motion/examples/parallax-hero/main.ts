// A mountain hero whose layers drift at different speeds as you scroll past, via scroll() with target and offset
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// How far each layer travels (px) while the hero scrolls out of view, at depth 1.
// Far layers move down (slower than the page), near ones move up (faster).
const LAYERS: Array<[selector: string, travel: number]> = [
  ['.sun', 90],
  ['.far', 60],
  ['.mid', 30],
  ['.near', -30],
  ['.title', 70],
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="frame">
      <div class="scroller">
        <section class="hero">
          <div class="sun"></div>
          <div class="ridge far"></div>
          <div class="ridge mid"></div>
          <div class="ridge near"></div>
          <h3 class="title">Northern ridge</h3>
        </section>
        <section class="after">
          <h4>Why layers?</h4>
          <p>Distant things seem to move slowly when you travel past them. Giving each layer its own speed fakes that depth.</p>
          <p>Each layer here is one animation tied to the same scroll range.</p>
          <p>Scroll back up and they return to where they started.</p>
        </section>
      </div>
    </div>`;
  el.querySelector('.frame')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const hero = el.querySelector<HTMLElement>('.hero')!;
  let depth = 1;
  let cancelAll: VoidFunction[] = [];

  const attach = (): void => {
    cancelAll.forEach((c) => c());
    cancelAll = LAYERS.map(([selector, travel]) => {
      const layer = animate(selector, { y: [0, travel * depth] }, { ease: 'linear' });
      // target = the hero. offset: from its top meeting the panel's top, to its bottom meeting the panel's top.
      return scroll(layer, { container: scroller, target: hero, offset: ['start start', 'end start'] });
    });
  };

  const scope = scopeMotion(el, () => {
    attach();
    if (preview) autoScroll(scroller, { duration: 5 });
  });

  const controls = !preview ? panel(el) : undefined;
  controls?.slider('depth', { min: 0, max: 2, step: 0.1, value: depth }, (v) => {
    depth = v;
    scope.run(attach);
  });
  if (!preview) hint(el, 'Scroll the panel. Distant layers lag behind the page, the foreground hurries ahead. Set depth to 0 for a flat picture, or 2 for exaggerated depth.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;

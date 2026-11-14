// show(el, { remove: true }) takes the other slides out of the DOM
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { DEFAULT_SLIDES, slide } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx);
  // Our own list of slide elements: removed ones stay here and come back by reference.
  const all = Array.from(box.children) as HTMLElement[];
  if (all.length === 0) all.push(...DEFAULT_SLIDES.map(slide));
  const t = vfx.addTransition(box, { transition: Swipe, duration: 0.7 });

  let remove = true;
  let i = 0;
  const report = (): string => `remove: ${remove}; box has ${box.children.length} child element(s), ${box.querySelectorAll('[hidden]').length} hidden`;
  const go = (): void => {
    i = (i + 1) % all.length;
    // An element not in the container is appended first, then the others go.
    void t.show(all[i]!, { remove }).then(() => stage.say(`${all[i]!.querySelector('h3')!.textContent}: ${report()}`));
  };

  if (stage.bar) {
    checkbox(stage.bar, 'remove: true', true, (v) => (remove = v));
    button(stage.bar, 'show next', go);
  } else {
    stage.every(2400, go);
  }
  stage.say(report());
  return () => stage.dispose();
};

export default mount;

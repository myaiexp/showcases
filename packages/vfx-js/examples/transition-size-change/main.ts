// VFX-JS example: content of another size: the box stays locked, then jumps
import { Crossfade } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/subjects.ts';
import { trKit } from '../../shared/tr-kit.ts';

const BODIES = [
  'Short.',
  'A much longer text that wraps over several lines, so this panel is taller than the short one and the box has to change its height when it replaces it.',
  'Medium length: two lines, perhaps three.',
];

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx, { slides: [] });
  // Fixed width, height from the content: the case the docs say jumps.
  box.style.height = '';
  box.style.border = '1px dashed #6a7aa0';
  box.style.background = 'transparent';
  box.style.width = stage.preview ? '200px' : '300px';
  let n = 0;
  const make = (k: number): HTMLElement => {
    const p = panel(`Panel ${k + 1}`, BODIES[k % BODIES.length]!);
    p.style.maxWidth = 'none';
    p.style.position = 'static';
    return p;
  };
  box.append(make(0));
  const t = vfx.addTransition(box, { transition: Crossfade, duration: 1.2 });

  const next = (): void => {
    n++;
    void t.run(() => {
      box.replaceChildren(make(n));
    }).then(() => stage.say(`Run ended: box is now ${box.offsetHeight}px tall (it was locked while the run played)`));
    stage.say('Run in flight: the box keeps its old height');
  };
  if (stage.bar) button(stage.bar, 'run(): swap in another panel', next);
  else stage.every(2800, next);
  stage.say('Dashed border = the box');
  return () => stage.dispose();
};

export default mount;

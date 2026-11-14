// VFX-JS example: keepWrapped keeps the box inside its canvas between runs
import { Swipe } from '@vfx-js/transitions';
import type { TransitionHandle } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // keepWrapped is a container option, so changing it means a new handle.
  const make = (keepWrapped: boolean): TransitionHandle =>
    vfx.addTransition(box, { transition: Swipe, duration: 0.7, keepWrapped });
  let t = make(true);
  let keep = true;
  let last = '';
  drive(kit, () => t, { label: () => `keepWrapped: ${keep}` });

  // Parent of the box: the scene normally, a <canvas> while VFX-JS has it wrapped.
  stage.frame(() => {
    const now = `box.parentElement is <${box.parentElement?.tagName.toLowerCase()}>, run in flight: ${t.running}`;
    if (now !== last) {
      last = now;
      stage.root.title = now;
      stage.say(`keepWrapped: ${keep}; ${now}`);
    }
  });
  if (stage.bar) {
    checkbox(stage.bar, 'keepWrapped', true, (v) => {
      keep = v;
      t.destroy();
      t = make(v);
    });
  }
  return () => stage.dispose();
};

export default mount;

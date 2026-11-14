// VFX-JS example: reverse: true plays a transition backwards
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  const t = vfx.addTransition(box, { transition: Swipe, duration: 0.8 });
  let reverse = false;
  drive(kit, t, {
    label: () => `reverse: ${reverse}`,
    showOpts: () => {
      // A card flips it every run; the full view has a checkbox (and Back always reverses).
      if (stage.preview) reverse = !reverse;
      return reverse ? { reverse } : {};
    },
  });
  if (stage.bar) checkbox(stage.bar, 'reverse on every run', false, (v) => (reverse = v));
  return () => stage.dispose();
};

export default mount;

// VFX-JS example: a transition instance whose params change during a run
import { Glitch } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // Passing the class would let core build it; an instance is used as is.
  const fx = new Glitch({ amount: 1, speed: 1 });
  const t = vfx.addTransition(box, { transition: fx, duration: 3 });
  drive(kit, t, { label: () => `instance.params: ${describe(fx.params)}`, ms: 4200 });

  if (stage.bar) {
    // Glitch reads this.params every frame, so a slider acts on a run in flight.
    slider(stage.bar, 'amount', 0, 3, 0.05, 1, (v) => {
      fx.params.amount = v;
      stage.say(`instance.params: ${describe(fx.params)}`);
    });
    slider(stage.bar, 'speed', 0.2, 3, 0.05, 1, (v) => {
      fx.params.speed = v;
      stage.say(`instance.params: ${describe(fx.params)}`);
    });
  } else {
    stage.frame((time) => {
      fx.params.amount = 1.5 + 1.5 * Math.sin(time * 2);
    });
  }
  return () => stage.dispose();
};

export default mount;

// VFX-JS example: the Zoom transition preset, run with show()
import { Zoom } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // An instance, so the controls can change fx.params between (and during) runs.
  const fx = new Zoom();
  let duration = 1;
  const t = vfx.addTransition(box, { transition: fx, duration });
  const label = (): string => `Zoom: ${'no params'}, ${duration}s`;
  drive(kit, t, { label, showOpts: () => ({ duration }) });

  const bar = stage.bar;
  if (bar) {
    const refresh = (): void => stage.say(label());
    slider(bar, 'duration', 0.2, 3, 0.1, duration, (v) => {
      duration = v;
      refresh();
    }, (v) => `${v}s`);

  }
  return () => stage.dispose();
};

export default mount;

// VFX-JS example: the JpegGlitch transition preset, its params as controls
import { JpegGlitch } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // An instance, so the controls can change fx.params between (and during) runs.
  const fx = new JpegGlitch({ iterations: 4, quality: 0.1 });
  let duration = 1.4;
  const t = vfx.addTransition(box, { transition: fx, duration });
  const label = (): string => `JpegGlitch: ${describe(fx.params)}, ${duration}s`;
  drive(kit, t, { label, showOpts: () => ({ duration }) });

  const bar = stage.bar;
  if (bar) {
    const refresh = (): void => stage.say(label());
    slider(bar, 'duration', 0.2, 3, 0.1, duration, (v) => {
      duration = v;
      refresh();
    }, (v) => `${v}s`);
    slider(bar, 'iterations', 1, 10, 1, 4, (v) => {
      fx.params.iterations = v;
      refresh();
    });
    slider(bar, 'quality', 0, 1, 0.02, 0.1, (v) => {
      fx.params.quality = v;
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;

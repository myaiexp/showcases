// VFX-JS example: the LensDistortion transition preset, its params as controls
import { LensDistortion } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // An instance, so the controls can change fx.params between (and during) runs.
  const fx = new LensDistortion({ strength: 1, dispersion: 0.6, zoom: 3 });
  let duration = 1.2;
  const t = vfx.addTransition(box, { transition: fx, duration });
  const label = (): string => `LensDistortion: ${describe(fx.params)}, ${duration}s`;
  drive(kit, t, { label, showOpts: () => ({ duration }) });

  const bar = stage.bar;
  if (bar) {
    const refresh = (): void => stage.say(label());
    slider(bar, 'duration', 0.2, 3, 0.1, duration, (v) => {
      duration = v;
      refresh();
    }, (v) => `${v}s`);
    slider(bar, 'strength', 0, 3, 0.05, 1, (v) => {
      fx.params.strength = v;
      refresh();
    });
    slider(bar, 'dispersion', 0, 2, 0.05, 0.6, (v) => {
      fx.params.dispersion = v;
      refresh();
    });
    slider(bar, 'zoom', 0, 6, 0.1, 3, (v) => {
      fx.params.zoom = v;
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;

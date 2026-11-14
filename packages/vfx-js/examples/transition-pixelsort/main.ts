// VFX-JS example: the Pixelsort transition preset, its params as controls
import { Pixelsort } from '@vfx-js/transitions';
import type { PixelSortDirection } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // An instance, so the controls can change fx.params between (and during) runs.
  const fx = new Pixelsort({ direction: 'up' });
  let duration = 1.6;
  const t = vfx.addTransition(box, { transition: fx, duration });
  const label = (): string => `Pixelsort: ${describe(fx.params)}, ${duration}s`;
  drive(kit, t, { label, showOpts: () => ({ duration }) });

  const bar = stage.bar;
  if (bar) {
    const refresh = (): void => stage.say(label());
    slider(bar, 'duration', 0.2, 3, 0.1, duration, (v) => {
      duration = v;
      refresh();
    }, (v) => `${v}s`);
    select<PixelSortDirection>(
      bar,
      'direction',
      [['up', 'up'], ['down', 'down'], ['left', 'left'], ['right', 'right']],
      (v) => {
        fx.params.direction = v;
        refresh();
      },
      'up',
    );
  }
  return () => stage.dispose();
};

export default mount;

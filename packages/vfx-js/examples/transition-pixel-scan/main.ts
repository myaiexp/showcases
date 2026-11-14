// VFX-JS example: the PixelScan transition preset, its params as controls
import { PixelScan, type PixelScanDirection } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // An instance, so the controls can change fx.params between (and during) runs.
  const fx = new PixelScan({ direction: 'right', blackout: true });
  let duration = 1.4;
  const t = vfx.addTransition(box, { transition: fx, duration });
  const label = (): string => `PixelScan: ${describe(fx.params)}, ${duration}s`;
  drive(kit, t, { label, showOpts: () => ({ duration }) });

  const bar = stage.bar;
  if (bar) {
    const refresh = (): void => stage.say(label());
    slider(bar, 'duration', 0.2, 3, 0.1, duration, (v) => {
      duration = v;
      refresh();
    }, (v) => `${v}s`);
    select<PixelScanDirection>(
      bar,
      'direction',
      [['right', 'right'], ['left', 'left'], ['up', 'up'], ['down', 'down'], ['center', 'center']],
      (v) => {
        fx.params.direction = v;
        refresh();
      },
      'right',
    );
    checkbox(bar, 'blackout', true, (v) => {
      fx.params.blackout = v;
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;

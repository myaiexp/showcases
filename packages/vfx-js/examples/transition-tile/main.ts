// VFX-JS example: the Tile transition preset, its params as controls
import { Tile, type TileDirection, type TileShape } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  // An instance, so the controls can change fx.params between (and during) runs.
  const fx = new Tile({ direction: 'center', shape: 'hex', count: 12, shadow: 0.5 });
  let duration = 1.2;
  const t = vfx.addTransition(box, { transition: fx, duration });
  const label = (): string => `Tile: ${describe(fx.params)}, ${duration}s`;
  drive(kit, t, { label, showOpts: () => ({ duration }) });

  const bar = stage.bar;
  if (bar) {
    const refresh = (): void => stage.say(label());
    slider(bar, 'duration', 0.2, 3, 0.1, duration, (v) => {
      duration = v;
      refresh();
    }, (v) => `${v}s`);
    select<TileDirection>(
      bar,
      'direction',
      [['center', 'center'], ['left', 'left'], ['right', 'right'], ['up', 'up'], ['down', 'down']],
      (v) => {
        fx.params.direction = v;
        refresh();
      },
      'center',
    );
    select<TileShape>(
      bar,
      'shape',
      [['hex', 'hex'], ['square', 'square']],
      (v) => {
        fx.params.shape = v;
        refresh();
      },
      'hex',
    );
    slider(bar, 'count', 2, 30, 1, 12, (v) => {
      fx.params.count = v;
      refresh();
    });
    slider(bar, 'shadow', 0, 1, 0.05, 0.5, (v) => {
      fx.params.shadow = v;
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;

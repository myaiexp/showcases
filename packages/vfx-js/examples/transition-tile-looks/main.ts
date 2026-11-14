// VFX-JS example: four Tile looks made only of different params
import { Tile, type TileParams } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const LOOKS: readonly (readonly [string, TileParams])[] = [
  ['big hexagons from the center', { direction: 'center', shape: 'hex', count: 6, shadow: 0.5 }],
  ['square grid sweeping left', { direction: 'left', shape: 'square', count: 12, shadow: 0.5 }],
  ['fine grid sweeping down, no shadow', { direction: 'down', shape: 'square', count: 28, shadow: 0 }],
  ['a few huge squares from the center', { direction: 'center', shape: 'square', count: 3, shadow: 0.8 }],
];

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new Tile({ ...LOOKS[0]![1] });
  const t = vfx.addTransition(box, { transition: fx, duration: 1.3 });
  let look = 0;
  let run = 0;
  const apply = (i: number): void => {
    look = i;
    Object.assign(fx.params, LOOKS[i]![1]);
  };
  drive(kit, t, {
    label: () => LOOKS[look]![0],
    showOpts: () => {
      if (stage.preview) apply(run++ % LOOKS.length);
      return {};
    },
    ms: 2800,
  });
  if (stage.bar) {
    select(stage.bar, 'look', LOOKS.map(([name], i) => [i, name] as const), (i) => {
      apply(i);
      stage.say(`Tile: ${LOOKS[i]![0]}`);
    });
  }
  return () => stage.dispose();
};

export default mount;

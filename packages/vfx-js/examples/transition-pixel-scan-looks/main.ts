// VFX-JS example: PixelScan from the center, with and without the blackout
import { PixelScan, type PixelScanDirection, type PixelScanParams } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { describe, drive, trKit } from '../../shared/tr-kit.ts';

const CARD_LOOKS: readonly PixelScanParams[] = [
  { direction: 'center', blackout: true },
  { direction: 'center', blackout: false },
  { direction: 'up', blackout: false },
  { direction: 'left', blackout: true },
];
const DIRECTIONS: readonly PixelScanDirection[] = ['right', 'left', 'up', 'down', 'center'];

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new PixelScan({ direction: 'center', blackout: true });
  const t = vfx.addTransition(box, { transition: fx, duration: 1.6 });
  let run = 0;
  drive(kit, t, {
    label: () => `PixelScan: ${describe(fx.params)}`,
    showOpts: () => {
      if (stage.preview) Object.assign(fx.params, CARD_LOOKS[run++ % CARD_LOOKS.length]);
      return {};
    },
    ms: 3000,
  });
  if (stage.bar) {
    select<PixelScanDirection>(stage.bar, 'direction', DIRECTIONS.map((d) => [d, d] as const), (v) => (fx.params.direction = v), 'center');
    checkbox(stage.bar, 'blackout', true, (v) => (fx.params.blackout = v));
  }
  return () => stage.dispose();
};

export default mount;

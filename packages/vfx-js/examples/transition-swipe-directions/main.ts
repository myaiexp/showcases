// Swipe's direction param, cycled in cards and picked in the full view
import { Swipe, type SwipeDirection } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const DIRECTIONS: readonly SwipeDirection[] = ['left', 'right', 'up', 'down'];

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;
  const fx = new Swipe({ direction: 'left' });
  const t = vfx.addTransition(box, { transition: fx, duration: 0.9 });
  let run = 0;
  drive(kit, t, {
    label: () => `Swipe direction: ${fx.params.direction}`,
    // Cards set the direction before each run; the full view leaves it to the select.
    showOpts: () => {
      if (stage.preview) fx.params.direction = DIRECTIONS[run++ % DIRECTIONS.length];
      return {};
    },
    ms: 2200,
  });
  if (stage.bar) {
    select<SwipeDirection>(stage.bar, 'direction', DIRECTIONS.map((d) => [d, d] as const), (v) => (fx.params.direction = v), 'left');
  }
  return () => stage.dispose();
};

export default mount;

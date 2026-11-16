// Image filters: HueRotation slider turns every colour around the wheel
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'fruit');
  const say = status(stage);

  // rotation runs from -1 to 1 and is multiplied by PI inside, so -1 and 1 are both half a turn.
  const hue = new filters.HueRotation({ rotation: 0.3 });
  const set = (v: number): void => {
    hue.rotation = v;
    show([hue]);
    say(`HueRotation ${v.toFixed(2)} (${Math.round(v * 180)} deg)`);
  };
  set(0.3);

  if (stage.bar) slider(stage.bar, 'rotation', -1, 1, 0.01, 0.3, set, (v) => v.toFixed(2));
  else sweep(stage, -1, 1, set, 5);
  return stage.dispose;
};

export default mount;

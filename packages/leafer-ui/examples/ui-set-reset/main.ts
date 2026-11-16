// UI: set() and reset()
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press set and reset.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const rect = new Rect({ x: stage.width / 2 - 50, y: stage.height / 2 - 50 });
  leafer.add(rect);
  const note = caption(stage, leafer);
  const set = (): void => {
    rect.set({ width: 100, height: 100, fill: '#32cd79', cornerRadius: 24, rotation: 15 });
    note.text = "set({ width, height, fill, cornerRadius, rotation })";
  };
  const reset = (): void => {
    rect.reset();
    rect.set({ x: stage.width / 2 - 50, y: stage.height / 2 - 50 });
    note.text = 'reset(): the defaults are back';
  };
  set();
  if (stage.bar) {
    button(stage.bar, 'set', set);
    button(stage.bar, 'reset', reset);
  } else {
    let on = true;
    stage.every(1300, () => (on = !on) ? set() : reset());
  }

  return stage.dispose;
};

export default mount;

// Data: set() changes several properties in one call
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'set({ x, y }) writes both in one call; set({}) with no transition is instant.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const rect = Rect.one({ fill: '#32cd79' }, 20, 20, S, S);
  leafer.add(rect);
  const note = caption(stage, leafer);
  const far = { x: stage.width - S - 20, y: stage.height - S - 50 };
  let atFar = false;
  const flip = (): void => {
    atFar = !atFar;
    rect.set(atFar ? far : { x: 20, y: 20 });
    note.text = `rect.set({ x: ${Math.round(rect.x!)}, y: ${Math.round(rect.y!)} })`;
  };
  if (stage.bar) button(stage.bar, 'set()', flip);
  else stage.every(1200, flip);

  return stage.dispose;
};

export default mount;

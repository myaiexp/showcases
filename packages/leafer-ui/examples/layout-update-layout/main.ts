// Layout: updateLayout makes bounds current right away
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Layout is worked out lazily, before the next frame. Read a bound straight after a change and it may be old; updateLayout() brings it up to date first.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const rect = new Rect({ x: 10, y: 20, width: S, height: S, fill: '#32cd79', cornerRadius: 8 });
  leafer.add(rect);
  const show = label(stage, '', true);
  let right = false;
  const run = (): void => {
    right = !right;
    const beforeX = rect.worldBoxBounds.x;
    rect.x = right ? stage.width - S - 10 : 10;
    const stale = rect.worldBoxBounds.x; // read at once
    rect.updateLayout();
    const fresh = rect.worldBoxBounds.x;
    show(`rect.x = ${Math.round(rect.x)}\nworldBoxBounds.x before the change ${Math.round(beforeX)}\nread right after the change    ${Math.round(stale)}\nafter rect.updateLayout()      ${Math.round(fresh)}`);
  };
  run();
  if (stage.bar) button(stage.bar, 'move the rect', run);
  else stage.every(1800, run);

  return stage.dispose;
};

export default mount;

// Interaction: hoverStyle nested inside a named state
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import '@leafer-in/state';
import '@leafer-in/animate';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover, click to switch state, hover again." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const p = mid(stage, S);
  const rect = new Rect({
    ...p,
    width: S,
    height: S,
    fill: '#32cd79',
    cornerRadius: 30,
    transition: 0.2,
    hoverStyle: { fill: '#FF4B4B' },
    states: { active: { fill: '#2b8cff', hoverStyle: { fill: '#FFE04B' } } },
  });
  leafer.add(rect);
  const say = label(stage, '', true);
  const show = (): void => say("state = '" + (rect.state || '') + "'");
  rect.on(PointerEvent.TAP, () => {
    rect.state = rect.state === 'active' ? '' : 'active';
    show();
  });
  show();
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: p.x + S / 2, y: p.y + S / 2 };
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(c.x, c.y, 500);
      await stage.wait(900);
      await ghost.tap(c.x, c.y);
      ghost.leave();
      await stage.wait(700);
      await ghost.glide(c.x, c.y, 500);
      await stage.wait(1000);
      await ghost.tap(c.x, c.y);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;

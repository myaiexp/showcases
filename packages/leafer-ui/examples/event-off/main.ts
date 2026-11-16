// Basics: removing listeners with off()
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the button to take the hover listeners off, then on again.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({ x: u(100), y: u(50), width: u(160), height: u(100), fill: '#32cd79', draggable: true });
  leafer.add(rect);
  const say = label(stage, 'listeners on', true);

  function onEnter(e: PointerEvent): void {
    (e.current as Rect).fill = '#42dd89';
  }
  function onLeave(e: PointerEvent): void {
    (e.current as Rect).fill = '#32cd79';
  }

  let on = false;
  const toggle = (): void => {
    on = !on;
    if (on) {
      rect.on('pointer.enter', onEnter);
      rect.on('pointer.leave', onLeave);
    } else {
      rect.off('pointer.enter', onEnter); // remove the same function
      rect.off('pointer.leave', onLeave);
      rect.fill = '#32cd79';
    }
    say(on ? 'listeners on: hover lightens' : 'listeners off: hover does nothing');
  };
  toggle();

  if (stage.preview) {
    // Hover while listening, then again after off().
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      if (!on) toggle();
      await ghost.glide(u(180), u(100), 500);
      await stage.wait(900);
      ghost.leave();
      toggle();
      await ghost.glide(u(180), u(100), 500);
      await stage.wait(900);
      ghost.leave();
      await stage.wait(300);
    });
  } else button(stage.bar!, 'toggle listeners', toggle);

  return stage.dispose;
};

export default mount;

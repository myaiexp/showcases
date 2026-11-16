// App & engine config: reading the elements under the pointer
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the overlapping area: the stack is listed.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { through: true }, // include the covered elements
      fill: '#333',
    }),
  );
  const data = { x: u(70), y: u(60), width: u(110), height: u(90), fill: '#32cd00' };
  const bottomRect = new Rect({ ...data, name: 'bottomRect' });
  leafer.add(bottomRect);
  const rect = new Rect({ ...data, name: 'rect', x: u(100), y: u(80), fill: '#FEB027' });
  leafer.add(rect);
  const say = label(stage, 'press the rects', true);

  rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    say(`throughPath: ${e.throughPath!.list.map((item) => item.name || item.tag).join(', ')}`);
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.tap(u(140), u(120));
      await stage.wait(1400);
      await ghost.tap(u(115), u(95));
      await stage.wait(1400);
    });
  }

  return stage.dispose;
};

export default mount;

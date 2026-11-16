// Event flow: capturing down to the target and bubbling back up
import { Box, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap the inner square. Capture listeners (on(type, fn, true)) run top-down, the others bottom-up.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 6 : 10);
  const ow = stage.width * 0.7;
  const oh = stage.height * 0.55;
  const outer = new Box({ name: 'outer', x: (stage.width - ow) / 2, y: stage.height - oh - 10, width: ow, height: oh, fill: '#4B8BFF55', cornerRadius: 10 });
  const middle = new Box({ name: 'middle', x: ow * 0.12, y: oh * 0.12, width: ow * 0.76, height: oh * 0.76, fill: '#32cd7966', cornerRadius: 8 });
  const inner = new Rect({ name: 'inner', x: ow * 0.2, y: oh * 0.2, width: ow * 0.35, height: oh * 0.35, fill: '#feb027', cornerRadius: 6 });
  middle.add(inner);
  outer.add(middle);
  leafer.add(outer);

  let n = 0;
  for (const el of [outer, middle, inner]) {
    el.on(PointerEvent.TAP, (e: PointerEvent) => log(`${++n}. ${el.name} capture  phase ${e.phase}`), true);
    el.on(PointerEvent.TAP, (e: PointerEvent) => log(`${++n}. ${el.name} bubble   phase ${e.phase}`));
  }
  leafer.on(PointerEvent.DOWN, () => (n = 0));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const b = inner.worldBoxBounds;
      await ghost.tap(b.x + b.width / 2, b.y + b.height / 2);
      await stage.wait(2200);
    });
  }
  return stage.dispose;
};

export default mount;

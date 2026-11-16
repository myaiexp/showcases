// UIEvent: the path of a tap through nested boxes
import { Box, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap the inner square, the middle box or the outer box. Each listener reports current; the first one also prints the path.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 5 : 10);
  const ow = stage.width * 0.7;
  const oh = stage.height * 0.55;
  const outer = new Box({ name: 'outer', x: (stage.width - ow) / 2, y: stage.height - oh - 10, width: ow, height: oh, fill: '#4B8BFF55', cornerRadius: 10 });
  const middle = new Box({ name: 'middle', x: ow * 0.15, y: oh * 0.15, width: ow * 0.7, height: oh * 0.7, fill: '#32cd7966', cornerRadius: 8 });
  const inner = new Rect({ name: 'inner', x: ow * 0.15, y: oh * 0.15, width: ow * 0.4, height: oh * 0.4, fill: '#feb027', cornerRadius: 6 });
  middle.add(inner);
  outer.add(middle);
  leafer.add(outer);

  let first = true;
  for (const box of [inner, middle, outer]) {
    box.on(PointerEvent.TAP, (e: PointerEvent) => {
      if (first) {
        first = false;
        const names = (e.path.list as { name?: string; tag: string }[]).map((l) => l.name || l.tag);
        log(`tap: path = ${names.join(' > ')}`);
        log(`target = ${e.target.name}`);
        stage.after(0, () => (first = true));
      }
      log(`  current = ${e.current.name}`);
    });
  }

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const spots = [inner, middle, outer].map((b) => {
        const bb = b.worldBoxBounds;
        return b === inner ? { x: bb.x + 8, y: bb.y + 8 } : b === middle ? { x: bb.x + bb.width - 8, y: bb.y + bb.height - 8 } : { x: bb.x + 5, y: bb.y + bb.height - 5 };
      });
      for (const s of spots) {
        await ghost.tap(s.x, s.y);
        await stage.wait(1300);
      }
    });
  }
  return stage.dispose;
};

export default mount;

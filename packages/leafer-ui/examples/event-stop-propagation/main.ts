// Event: stopping a tap on its way up
import { Box, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap the inner square. The middle box calls the chosen method in its first listener.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 5 : 8);
  const ow = stage.width * 0.7;
  const oh = stage.height * 0.5;
  const outer = new Box({ name: 'outer', x: (stage.width - ow) / 2, y: stage.height - oh - 10, width: ow, height: oh, fill: '#4B8BFF55', cornerRadius: 10 });
  const middle = new Box({ name: 'middle', x: ow * 0.12, y: oh * 0.12, width: ow * 0.76, height: oh * 0.76, fill: '#32cd7966', cornerRadius: 8 });
  const inner = new Rect({ name: 'inner', x: ow * 0.2, y: oh * 0.22, width: ow * 0.3, height: oh * 0.3, fill: '#feb027', cornerRadius: 6 });
  middle.add(inner);
  outer.add(middle);
  leafer.add(outer);

  let method: 'none' | 'stop' | 'stopNow' | 'stopDefault' = 'none';
  inner.on(PointerEvent.TAP, () => log('inner'));
  middle.on(PointerEvent.TAP, (e: PointerEvent) => {
    log('middle listener A');
    if (method !== 'none') e[method]();
    log(`  isStop ${e.isStop}  isStopDefault ${!!e.isStopDefault}`);
  });
  middle.on(PointerEvent.TAP, () => log('middle listener B'));
  outer.on(PointerEvent.TAP, () => log('outer'));

  pick(stage, 'middle calls', ['none', 'stop', 'stopNow', 'stopDefault'] as const, (m) => {
    method = m;
    log(`--- middle calls ${m}()`);
  }, 3000);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const b = inner.worldBoxBounds;
      await ghost.tap(b.x + b.width / 2, b.y + b.height / 2);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;

// DragEvent: state events on the element a drag passes over
import { DragEvent, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square across the dashed zone and out again.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.2, stage.height * 0.3);
  const zone = new Rect({ x: stage.width * 0.4, y: stage.height - s * 2.4 - 12, width: stage.width * 0.35, height: s * 2.4, stroke: '#999', strokeWidth: 2, dashPattern: [6, 5], fill: 'rgba(0,0,0,0.04)', cornerRadius: 10 });
  const box = new Rect({ x: 24, y: stage.height - s * 1.7 - 12, width: s, height: s, fill: GREEN, cornerRadius: 8, draggable: true });
  leafer.add([zone, box]);

  let overs = 0;
  zone.on(DragEvent.ENTER, () => ((zone.fill = 'rgba(50,205,121,0.3)'), log(DragEvent.ENTER)));
  zone.on(DragEvent.LEAVE, () => ((zone.fill = 'rgba(0,0,0,0.04)'), log(DragEvent.LEAVE)));
  zone.on(DragEvent.OVER, () => void (++overs === 1 && log(DragEvent.OVER)));
  zone.on(DragEvent.OUT, () => ((overs = 0), log(DragEvent.OUT)));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const y = box.y! + s / 2;
    script(stage, async () => {
      await ghost.drag({ x: 24 + s / 2, y }, { x: stage.width - 14, y }, 1800);
      await stage.wait(400);
      await ghost.drag({ x: stage.width - 14 - s / 2 + s / 2, y }, { x: 24 + s / 2, y }, 1200);
      await stage.wait(400);
    });
  }
  return stage.dispose;
};

export default mount;

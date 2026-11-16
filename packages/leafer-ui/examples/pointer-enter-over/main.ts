// PointerEvent: enter/leave on a group versus over/out on the same group
import { Group, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Cross from the blue panel onto the green square inside it: the group gets over/out again, but no enter/leave.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const pw = stage.width * 0.7;
  const ph = stage.height * 0.5;
  const px = (stage.width - pw) / 2;
  const py = stage.height - ph - 12;
  const group = new Group();
  const panel = new Rect({ x: px, y: py, width: pw, height: ph, fill: '#4B8BFF', cornerRadius: 10 });
  const inner = new Rect({ x: px + pw * 0.3, y: py + ph * 0.2, width: pw * 0.4, height: ph * 0.6, fill: GREEN, cornerRadius: 8 });
  group.add([panel, inner]);
  leafer.add(group);

  for (const type of [PointerEvent.ENTER, PointerEvent.LEAVE, PointerEvent.OVER, PointerEvent.OUT]) {
    group.on(type, (e: PointerEvent) => log(`group ${type}  target ${e.target === inner ? 'inner' : e.target === panel ? 'panel' : '?'}`));
  }

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const y = py + ph / 2;
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(px + 14, y, 500);
      await ghost.glide(px + pw / 2, y, 700);
      await ghost.glide(px + pw - 14, y, 700);
      await ghost.glide(px + pw + 30, y, 500);
      await stage.wait(500);
    });
  }
  return stage.dispose;
};

export default mount;

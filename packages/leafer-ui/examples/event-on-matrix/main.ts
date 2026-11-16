// Interaction: registering several listeners in one on() call
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { logLines, tour, visit } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover, then press the rect twice: only the first press logs." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  rect.on([
    [PointerEvent.ENTER, () => ((rect.fill = '#42dd89'), log('enter'))],
    [PointerEvent.LEAVE, () => ((rect.fill = GREEN), log('leave'))],
    [PointerEvent.DOWN, () => log('down (once)'), 'once'],
  ]);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    tour(stage, [0], async () => {
      await visit(stage, ghost, c, 700, true);
      await visit(stage, ghost, c, 700, true);
    });
  }

  return stage.dispose;
};

export default mount;

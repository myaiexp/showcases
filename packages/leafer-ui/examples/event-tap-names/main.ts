// Interaction: the event names that skip the pointer prefix
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { logLines } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click, double-click and press-and-hold the rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  rect.on('tap double_tap long_press long_tap', (e: PointerEvent) => log(e.type));
  const flash = (): void => {
    rect.fill = '#42dd89';
    stage.after(180, () => (rect.fill = GREEN));
  };
  rect.on('tap double_tap long_press long_tap', flash);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await stage.wait(500);
      await ghost.tap(c.x, c.y);
      await stage.wait(900);
      await ghost.doubleTap(c.x, c.y);
      await stage.wait(900);
      ghost.down();
      await stage.wait(1300);
      ghost.up();
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;

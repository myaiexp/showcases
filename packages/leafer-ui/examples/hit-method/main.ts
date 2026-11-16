// Interaction: hit() tests a world point against an element
import { Leafer, Rect, PointerEvent, type IPointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { label, GREEN } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move around the rect; raise the radius to hit it from further away." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.6;
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const say = label(stage, '', true);
  let radius = 0;
  leafer.on(PointerEvent.MOVE, (e: IPointerEvent) => {
    const hit = rect.hit({ x: e.x, y: e.y }, radius);
    rect.fill = hit ? '#FF4B4B' : GREEN;
    say('rect.hit({ x: ' + Math.round(e.x) + ', y: ' + Math.round(e.y) + ' }, ' + Math.round(radius) + ') = ' + hit);
  });
  drive(stage, 'hitRadius', [0, 50, 1], 0, (v) => (radius = v), 7);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const y = rect.y! + S / 2;
    script(stage, async () => {
      await ghost.glide(rect.x! - 50, y, 300);
      await ghost.glide(rect.x! + S + 50, y + 20, 3200);
      await stage.wait(300);
    });
  }

  return stage.dispose;
};

export default mount;

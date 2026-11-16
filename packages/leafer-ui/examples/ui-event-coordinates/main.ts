// UIEvent: one tap, five coordinate systems
import { Group, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap anywhere on the tilted green rect (it sits in a scaled, rotated group inside a zoomed leafer).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  leafer.scale = 1.25;
  const group = new Group({ x: stage.width * 0.2, y: stage.preview ? 62 : 90, rotation: 12, scale: 0.9 });
  const w = stage.width * 0.55;
  const h = stage.preview ? 70 : 120;
  const rect = new Rect({ x: 10, y: 10, width: w, height: h, fill: GREEN, cornerRadius: 8 });
  group.add(rect);
  leafer.add(group);
  const dot = new Rect({ width: 8, height: 8, around: 'center', fill: '#ff4b4b', hittable: false, visible: false });
  leafer.add(dot);
  const say = label(stage, 'tap the rect');

  const r = (p: { x: number; y: number }): string => `${Math.round(p.x)}, ${Math.round(p.y)}`;
  rect.on(PointerEvent.TAP, (e: PointerEvent) => {
    dot.set({ ...e.getPagePoint(), visible: true });
    say(
      [`x, y (world)    ${r(e)}`, `getPagePoint()  ${r(e.getPagePoint())}`, `getBoxPoint()   ${r(e.getBoxPoint())}`, `getInnerPoint() ${r(e.getInnerPoint())}`, `getLocalPoint() ${r(e.getLocalPoint())}`].join('\n'),
    );
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const pts = [{ x: 0.3, y: 0.35 }, { x: 0.7, y: 0.6 }];
      for (const p of pts) {
        const b = rect.worldBoxBounds;
        await ghost.tap(b.x + b.width * p.x, b.y + b.height * p.y);
        await stage.wait(1400);
      }
    });
  }
  return stage.dispose;
};

export default mount;

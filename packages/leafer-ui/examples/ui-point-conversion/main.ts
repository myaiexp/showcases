// UI: world, local, inner and box points
import { Ellipse, Group, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the rotated rect.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.7;
  const group = new Group({ x: stage.width / 2, y: stage.height / 2 - 8, rotation: 25, scale: 1 });
  const rect = new Rect({ x: -S * 0.6, y: -S * 0.4, width: S * 1.2, height: S * 0.8, fill: '#32cd79', cornerRadius: 8 });
  group.add(rect);
  leafer.add(group);
  const note = caption(stage, leafer);
  note.height = 40;
  note.y = stage.height - (stage.preview ? 36 : 44);
  const dot = new Ellipse({ width: 10, height: 10, fill: '#FF4B4B', hittable: false });
  leafer.add(dot);
  const show = (e: { x: number; y: number }): void => {
    const w = { x: e.x, y: e.y };
    const inner = rect.getInnerPoint(w), box = rect.getBoxPoint(w), local = rect.getLocalPoint(w);
    const r = (p: { x: number; y: number }): string => `${Math.round(p.x)}, ${Math.round(p.y)}`;
    dot.set({ x: e.x - 5, y: e.y - 5 });
    note.text = `world ${r(w)}  local ${r(local)}  inner ${r(inner)}  box ${r(box)}`;
  };
  leafer.on(PointerEvent.MOVE, show);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.glide(stage.width / 2 - S * 0.3, stage.height / 2 - 40, 400);
      await ghost.glide(stage.width / 2 + S * 0.4, stage.height / 2 + 10, 1400);
      await ghost.glide(stage.width / 2 - S * 0.5, stage.height / 2 + 30, 1400);
    });
  }

  return stage.dispose;
};

export default mount;

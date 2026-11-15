// UITransform size and pivot: the box and its rotation point
import { Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, rect, uiScene, whiteSprite } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, 'pivot (0.5, 0.5) | (0, 0) | (1, 1): each turns about its pivot');
  const pivots: [number, number][] = [[0.5, 0.5], [0, 0], [1, 1]];
  const boxes = pivots.map(([px, py], i) => {
    const b = image(canvasEntity, -230 + i * 230, 0, 130, 80, { color: [[0.9, 0.5, 0.3, 1], [0.4, 0.8, 0.5, 1], [0.4, 0.6, 0.95, 1]][i] as [number, number, number, number] }, `box${i}`);
    rect(b.entity).pivot = new Vector2(px, py);
    // A small white dot marks the entity's own position, which is where the pivot sits.
    image(canvasEntity, -230 + i * 230, 0, 10, 10, { sprite: whiteSprite(stage.engine) }, 'dot');
    return b.entity;
  });
  tick(canvasEntity, (_dt, t) => boxes.forEach((b) => b.transform.setRotation(0, 0, t * 40)));
  if (!stage.preview) {
    slider(stage.bar, 'size.x', 40, 220, 1, 130, (v) => boxes.forEach((b) => (rect(b).size = new Vector2(v, rect(b).size.y))));
    slider(stage.bar, 'last pivot.x', 0, 1, 0.01, 1, (v) => (rect(boxes[2]!).pivot = new Vector2(v, rect(boxes[2]!).pivot.y)));
    say('size.x and the last box pivot.x have sliders');
  }
  return stage.dispose;
};

export default mount;

// UI: pick returns the element under a point
import { Ellipse, Leafer, PointerEvent, Rect, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the shapes.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.55;
  const a = new Rect({ id: 'green square', x: stage.width / 2 - S * 1.1, y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill: '#32cd79' });
  const b = new Ellipse({ id: 'yellow circle', x: stage.width / 2 - S * 0.45, y: stage.height / 2 - S * 0.2 - 12, width: S, height: S, fill: '#FEB027' });
  const c = new Star({ id: 'red star', x: stage.width / 2 + S * 0.1, y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill: '#FF4B4B' });
  leafer.add([a, b, c]);
  const note = caption(stage, leafer);
  const show = (e: { x: number; y: number }): void => {
    const hit = leafer.pick({ x: e.x, y: e.y });
    note.text = hit.target ? `pick -> ${hit.target.id || hit.target.tag}` : 'pick -> nothing (the Leafer)';
  };
  leafer.on(PointerEvent.MOVE, show);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const y = stage.height / 2 - 12;
      for (const x of [stage.width / 2 - S * 0.8, stage.width / 2 - S * 0.2, stage.width / 2 + S * 0.5, stage.width - 20]) {
        await ghost.glide(x, y, 700);
        await stage.wait(600);
      }
    });
  }

  return stage.dispose;
};

export default mount;

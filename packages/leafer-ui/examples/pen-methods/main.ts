// Pen: Canvas 2D style path methods
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a method.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const draw: Record<string, () => void> = {
    rect: () => pen.rect(10, 20, 80, 60),
    roundRect: () => pen.roundRect(10, 20, 80, 60, [30, 5]),
    ellipse: () => pen.ellipse(50, 50, 40, 25, 30, 0, 270),
    arc: () => pen.arc(50, 50, 35, -90, 90),
    quadraticCurveTo: () => pen.moveTo(10, 80).quadraticCurveTo(50, -20, 90, 80).closePath(),
    bezierCurveTo: () => pen.moveTo(10, 80).bezierCurveTo(10, 0, 90, 0, 90, 80).closePath(),
  };
  const note = caption(stage, leafer);
  pick(stage, 'method', Object.keys(draw), (name) => {
    pen.clear();
    pen.setStyle({ fill: '#32cd79', stroke: '#1d7a48', strokeWidth: 2 });
    draw[name]!();
    note.text = `pen.${name}(...)`;
  }, 1500);

  return stage.dispose;
};

export default mount;

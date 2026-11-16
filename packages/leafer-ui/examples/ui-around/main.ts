// UI: around anchors the transform point
import { Ellipse, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick the anchor.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.55;
  const rect = new Rect({ x: stage.width / 2, y: stage.height / 2 - 8, width: S, height: S, fill: '#32cd79', cornerRadius: 10, opacity: 0.8, around: 'center' });
  const dot = new Ellipse({ x: stage.width / 2 - 5, y: stage.height / 2 - 13, width: 10, height: 10, fill: '#FF4B4B', hittable: false });
  leafer.add([rect, dot]);
  const note = caption(stage, leafer);
  pick(stage, 'around', ['center', 'top-left', 'bottom-right', 'left', 'top'] as const, (a) => {
    rect.around = a;
    note.text = `around: '${a}'`;
  }, 2200);
  stage.loop((_dt, t) => (rect.rotation = Math.sin(t * 1.2) * 60));

  return stage.dispose;
};

export default mount;

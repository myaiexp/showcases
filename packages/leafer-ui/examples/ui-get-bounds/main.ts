// UI: getBounds box, stroke and render
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a bounds type.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.55;
  const rect = new Rect({
    x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 8, width: S, height: S, fill: '#32cd79', rotation: 20,
    stroke: '#1d7a48', strokeWidth: 12, shadow: { x: 18, y: 18, blur: 14, color: 'rgba(0,0,0,0.35)' },
  });
  const outline = new Rect({ stroke: '#FF4B4B', strokeWidth: 1, dashPattern: [5, 4], hittable: false });
  leafer.add([rect, outline]);
  const note = caption(stage, leafer);
  pick(stage, 'type', ['box', 'stroke', 'render'] as const, (type) => {
    const { x, y, width, height } = rect.getBounds(type, 'world');
    outline.set({ x, y, width, height });
    note.text = `getBounds('${type}'): ${Math.round(width!)} x ${Math.round(height!)}`;
  }, 1700);
  stage.loop((_dt, t) => (rect.rotation = 20 + Math.sin(t) * 15));

  return stage.dispose;
};

export default mount;

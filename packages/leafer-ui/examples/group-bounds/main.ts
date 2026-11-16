// Group: getBounds covers all children
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the circle: the outline follows.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.5;
  const rect = new Rect({ x: 40, y: stage.height / 2 - S / 2 - 10, width: S, height: S, fill: '#32cd79' });
  const dot = new Ellipse({ x: 40 + S + 10, y: stage.height / 2 - S / 2 - 10, width: S * 0.6, height: S * 0.6, fill: '#FEB027', draggable: true });
  const group = new Group({ children: [rect, dot] });
  const outline = new Rect({ stroke: '#FF4B4B', strokeWidth: 2, dashPattern: [5, 4], hittable: false });
  leafer.add([group, outline]);
  const note = caption(stage, leafer);
  const sync = (): void => {
    const { x, y, width, height } = group.getBounds();
    outline.set({ x, y, width, height });
    note.text = `${Math.round(width!)} x ${Math.round(height!)}`;
  };
  stage.loop((_dt, t) => {
    if (stage.preview) dot.x = 40 + S + 10 + (Math.sin(t * 1.4) + 1) * 40;
    sync();
  });

  return stage.dispose;
};

export default mount;

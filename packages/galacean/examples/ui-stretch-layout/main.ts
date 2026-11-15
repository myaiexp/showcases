// A responsive layout from LeftAndRight and TopAndBottom alignment
import { HorizontalAlignmentMode, VerticalAlignmentMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, rect, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  caption(stage, 'header, sidebar and content stretch with the window frame');
  const frame = image(canvasEntity, 0, 0, 640, 320, { color: [0.35, 0.4, 0.5, 0.6] }, 'frame');
  const place = (name: string, color: [number, number, number, number], h: HorizontalAlignmentMode, v: VerticalAlignmentMode, l: number, r: number, t: number, b: number, w = 100, ht = 100) => {
    const part = image(frame.entity, 0, 0, w, ht, { color }, name);
    const tr = rect(part.entity);
    tr.horizontalAlignment = h;
    tr.verticalAlignment = v;
    tr.alignLeft = l;
    tr.alignRight = r;
    tr.alignTop = t;
    tr.alignBottom = b;
    label(part.entity, 0, 0, name, 20).text.enableWrapping = false;
  };
  place('header', [0.85, 0.5, 0.3, 1], HorizontalAlignmentMode.LeftAndRight, VerticalAlignmentMode.Top, 10, 10, 10, 0, 100, 50);
  place('sidebar', [0.4, 0.7, 0.5, 1], HorizontalAlignmentMode.Left, VerticalAlignmentMode.TopAndBottom, 10, 0, 70, 10, 120, 100);
  place('content', [0.4, 0.55, 0.9, 1], HorizontalAlignmentMode.LeftAndRight, VerticalAlignmentMode.TopAndBottom, 140, 10, 70, 10);
  const size = (w: number, h: number): void => {
    rect(frame.entity).size.set(w, h);
  };
  if (stage.preview) tick(canvasEntity, (_dt, t) => size(560 + 120 * Math.sin(t * 1.1), 280 + 60 * Math.sin(t * 0.8)));
  else {
    slider(stage.bar, 'frame width', 360, 780, 1, 640, (v) => size(v, rect(frame.entity).size.y));
    slider(stage.bar, 'frame height', 200, 380, 1, 320, (v) => size(rect(frame.entity).size.x, v));
  }
  return stage.dispose;
};

export default mount;

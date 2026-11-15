// UITransform.verticalAlignment: Top, Bottom, Middle, TopAndBottom
import { VerticalAlignmentMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, rect, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  caption(stage, 'the grey parent changes height; each column keeps its alignment');
  const parent = image(canvasEntity, 0, 0, 600, 260, { color: [0.45, 0.5, 0.6, 0.5] }, 'parent');
  const cols: [string, VerticalAlignmentMode, number, number][] = [
    ['Top 10', VerticalAlignmentMode.Top, 10, 0],
    ['Bottom 10', VerticalAlignmentMode.Bottom, 0, 10],
    ['Middle 0', VerticalAlignmentMode.Middle, 0, 0],
    ['Top&Bottom 30', VerticalAlignmentMode.TopAndBottom, 30, 30],
  ];
  cols.forEach(([name, mode, top, bottom], i) => {
    const bar = image(parent.entity, -210 + i * 140, 0, 110, 70, { color: [[0.9, 0.5, 0.3, 1], [0.4, 0.8, 0.5, 1], [0.4, 0.6, 0.95, 1], [0.85, 0.7, 0.3, 1]][i] as [number, number, number, number] }, `col${i}`);
    const t = rect(bar.entity);
    t.verticalAlignment = mode;
    t.alignTop = top;
    t.alignBottom = bottom;
    label(bar.entity, 0, 0, name, 17).text.enableWrapping = false;
  });
  const height = (h: number): void => void (rect(parent.entity).size.y = h);
  if (stage.preview) tick(canvasEntity, (_dt, t) => height(230 + 70 * Math.sin(t * 1.1)));
  else slider(stage.bar, 'parent height', 120, 340, 1, 260, height);
  return stage.dispose;
};

export default mount;

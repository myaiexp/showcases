// UITransform.horizontalAlignment: Left, Right, Center, LeftAndRight
import { HorizontalAlignmentMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, rect, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  caption(stage, 'the grey parent changes width; each bar keeps its alignment');
  const parent = image(canvasEntity, 0, 0, 560, 300, { color: [0.45, 0.5, 0.6, 0.5] }, 'parent');
  const rows: [string, HorizontalAlignmentMode, number, number][] = [
    ['Left, alignLeft 20', HorizontalAlignmentMode.Left, 20, 0],
    ['Right, alignRight 20', HorizontalAlignmentMode.Right, 0, 20],
    ['Center, alignCenter 0', HorizontalAlignmentMode.Center, 0, 0],
    ['LeftAndRight, 40 and 40', HorizontalAlignmentMode.LeftAndRight, 40, 40],
  ];
  rows.forEach(([name, mode, left, right], i) => {
    const bar = image(parent.entity, 0, 100 - i * 66, 200, 46, { color: [[0.9, 0.5, 0.3, 1], [0.4, 0.8, 0.5, 1], [0.4, 0.6, 0.95, 1], [0.85, 0.7, 0.3, 1]][i] as [number, number, number, number] }, `bar${i}`);
    const t = rect(bar.entity);
    t.horizontalAlignment = mode;
    t.alignLeft = left;
    t.alignRight = right;
    label(bar.entity, 0, 0, name, 20);
  });
  const width = (w: number): void => void (rect(parent.entity).size.x = w);
  if (stage.preview) tick(canvasEntity, (_dt, t) => width(520 + 160 * Math.sin(t * 1.1)));
  else slider(stage.bar, 'parent width', 300, 700, 1, 560, width);
  return stage.dispose;
};

export default mount;

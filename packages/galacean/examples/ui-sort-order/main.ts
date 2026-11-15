// UICanvas.sortOrder: the higher of two overlay canvases draws on top
import { CanvasRenderMode, UICanvas } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, root, canvas } = ui;
  const say = caption(stage, '');
  // A second root canvas, a sibling of the first (a canvas inside another canvas would not render).
  const otherEntity = root.createChild('canvas2');
  const other = otherEntity.addComponent(UICanvas);
  other.renderMode = CanvasRenderMode.ScreenSpaceOverlay;
  other.referenceResolution.set(800, 400);
  other.resolutionAdaptationMode = canvas.resolutionAdaptationMode;
  const a = image(ui.canvasEntity, -50, 20, 240, 160, { color: [0.9, 0.3, 0.3, 1] }, 'red');
  const b = image(otherEntity, 50, -20, 240, 160, { color: [0.3, 0.5, 0.95, 1] }, 'blue');
  label(a.entity, 0, 0, 'canvas 1', 28);
  label(b.entity, 0, 0, 'canvas 2', 28);
  const sets: [number, number][] = [[0, 1], [2, 1], [1, 1], [1, 5]];
  const apply = (x: number, y: number): void => {
    canvas.sortOrder = x;
    other.sortOrder = y;
    say(`canvas 1 sortOrder ${x}, canvas 2 sortOrder ${y}`);
  };
  if (stage.preview) steps(root, 1.6, sets.length, (i) => apply(...sets[i]!));
  else {
    apply(0, 1);
    slider(stage.bar, 'canvas 1 sortOrder', 0, 5, 1, 0, (v) => apply(v, other.sortOrder));
    slider(stage.bar, 'canvas 2 sortOrder', 0, 5, 1, 1, (v) => apply(canvas.sortOrder, v));
  }
  return stage.dispose;
};

export default mount;

// Image filters: an image's resizeFilter resamples it when drawn much smaller
import type { Mount } from '@/types.ts';
import { Canvas, FabricImage, filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { SIZE, filterStage, sweep } from '../../shared/filter-demo.ts';
import { picture } from '../../shared/images.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx, ctx.preview ? undefined : ['no resizeFilter', 'resizeFilter: Resize'], 'A 640 x 440 picture drawn at a fraction of its size');
  const say = status(stage);

  const images = stage.panes.map((pane, i) => {
    const canvas = stage.own(new Canvas(pane.el, { selection: false, skipTargetFind: true }), pane);
    const img = new FabricImage(picture('city', 640, 440), { left: SIZE[0] / 2, top: SIZE[1] / 2 });
    // In a card the one pane gets the resizeFilter. Fabric applies it while drawing, once the
    // image's total scale falls below minimumScaleTrigger (0.5), and keeps it set to that scale.
    if (i === 1 || stage.preview) img.resizeFilter = new filters.Resize({ resizeType: 'hermite' });
    canvas.add(img);
    return img;
  });
  const set = (s: number): void => {
    for (const img of images) {
      img.scale(s);
      img.canvas?.requestRenderAll();
    }
    say(`scale ${s.toFixed(2)}, minimumScaleTrigger ${images[0]!.minimumScaleTrigger}`);
  };
  set(0.35);

  if (stage.bar) slider(stage.bar, 'image scale', 0.2, 0.5, 0.01, 0.35, set, (v) => v.toFixed(2));
  else sweep(stage, 0.25, 0.5, set, 3);
  return stage.dispose;
};

export default mount;

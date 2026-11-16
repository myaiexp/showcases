// Clip paths: the same picture clipped by a Circle, Rect, Triangle, Ellipse, Polygon or Path
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { CLIP_SHAPES, clipShape, type ClipShape } from '../../shared/clip.ts';
import { select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Any fabric object works as a clipPath. Rotate the clip to see it is a real object.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const img = new FabricImage(picture('fruit', 300, 200), { left: 150, top: 100, selectable: false });
  canvas.add(img);

  let kind: ClipShape = 'circle';
  let size = 150;
  let angle = 0;
  const apply = (): void => {
    // clip paths are fill-agnostic: only the shape's alpha matters
    img.clipPath = clipShape(kind, size, { angle });
    img.set('dirty', true);
    say(`clipPath = ${img.clipPath.type}`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    select(stage.bar, 'shape', CLIP_SHAPES, (v) => { kind = v; apply(); });
    slider(stage.bar, 'size', 60, 260, 1, size, (v) => { size = v; apply(); });
    slider(stage.bar, 'angle', 0, 360, 1, 0, (v) => { angle = v; apply(); });
  } else {
    let i = 0;
    stage.every(1200, () => { kind = CLIP_SHAPES[++i % CLIP_SHAPES.length]!; apply(); });
    stage.loop((_dt, t) => { angle = (t * 40) % 360; apply(); });
  }
  return stage.dispose;
};

export default mount;

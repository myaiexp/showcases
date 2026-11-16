// setSrc(url) swaps the picture an existing FabricImage shows
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pictureURL, type Picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const KINDS: Picture[] = ['landscape', 'fruit', 'portrait', 'city'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'One FabricImage object, four pictures. After setSrc the object keeps its angle and scale; the new picture has its own pixel size, so the width follows it.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'loading…');

  const urls = KINDS.map((k) => pictureURL(k, k === 'portrait' ? 200 : 280, k === 'portrait' ? 260 : 190));
  const image = new FabricImage(document.createElement('canvas'), { left: 160, top: 110, angle: -8, scaleX: 0.7, scaleY: 0.7, stroke: '#3b2a8c', strokeWidth: 4 });
  canvas.add(image);

  const show = async (i: number): Promise<void> => {
    await image.setSrc(urls[i]!);
    if (stage.disposed) return;
    image.setCoords();
    say(`setSrc → ${KINDS[i]} · ${image.width} × ${image.height} px`);
    canvas.requestRenderAll();
  };
  void show(0);
  if (stage.bar) KINDS.forEach((k, i) => button(stage.bar!, k, () => void show(i)));
  else {
    let i = 0;
    stage.every(1200, () => void show(++i % KINDS.length));
  }

  return stage.dispose;
};

export default mount;

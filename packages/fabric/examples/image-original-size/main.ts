// getOriginalSize() is the source's pixel size
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'Scale or crop the image: width, height and the scaled size change, getOriginalSize() never does.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const image = new FabricImage(picture('fruit', 200, 140), { left: 160, top: 110 });
  canvas.add(image);

  const apply = (): void => {
    const o = image.getOriginalSize();
    image.setCoords();
    say(`getOriginalSize ${o.width} × ${o.height}\nwidth ${image.width.toFixed(0)} × ${image.height.toFixed(0)} · scaled ${image.getScaledWidth().toFixed(0)} × ${image.getScaledHeight().toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply();
  if (stage.bar) {
    slider(stage.bar, 'scale', 0.3, 1.5, 0.05, 1, (v) => (image.scale(v), apply()), (v) => v.toFixed(2));
    slider(stage.bar, 'width (crop)', 40, 200, 1, 200, (v) => (image.set('width', v), apply()));
  } else {
    stage.loop((_dt, t) => {
      image.scale(1 + 0.3 * Math.sin(t * 1.4));
      image.set('width', 150 + 50 * Math.sin(t * 0.8));
      apply();
    });
  }

  return stage.dispose;
};

export default mount;

// FabricImage.fromURL(url) loads an image and resolves with a ready FabricImage
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { pictureURL } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'fromURL() returns a promise (v5 and earlier took a callback). The URL is a data: URL made in code; any URL the browser can load works.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'loading…');

  const loaded = FabricImage.fromURL(pictureURL('portrait', 300, 300));
  void load();
  async function load(): Promise<void> {
    const image = await loaded;
    if (stage.disposed) return;
    // the guide: scale the image down and flip it before adding it to the canvas
    image.scale(0.5);
    image.set({ left: 160, top: 110, flipX: true });
    canvas.add(image);

    const apply = (): void => {
      image.setCoords();
      say(`${image.width} × ${image.height} px · scale ${image.scaleX.toFixed(2)}\nflipX ${image.flipX}`);
      canvas.requestRenderAll();
    };
    apply();
    if (stage.bar) {
      slider(stage.bar, 'scale', 0.2, 0.7, 0.01, 0.5, (v) => (image.scale(v), apply()), (v) => v.toFixed(2));
      checkbox(stage.bar, 'flipX', true, (v) => (image.set('flipX', v), apply()));
    } else {
      stage.loop((_dt, t) => {
        image.scale(0.5 + 0.1 * Math.sin(t * 1.5));
        image.set('flipX', Math.sin(t * 0.8) > 0);
        apply();
      });
    }
  }

  return stage.dispose;
};

export default mount;

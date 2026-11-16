// Resource: giving a hand-drawn canvas a url of its own
import { Image, Leafer, Resource } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';

let counter = 0;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The picture is a raw canvas registered as leafer://... and shown by an ordinary Image.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);

  const key = `leafer://showcase-canvas-${++counter}.png`; // keys are page-wide: make them unique
  let image: Image | undefined;
  let hue = 120;
  const paint = (): void => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 140;
    const g = canvas.getContext('2d')!;
    const grad = g.createLinearGradient(0, 0, 200, 140);
    grad.addColorStop(0, `hsl(${hue} 70% 55%)`);
    grad.addColorStop(1, `hsl(${hue + 80} 80% 60%)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 200, 140);
    g.fillStyle = 'white';
    g.font = '24px sans-serif';
    g.fillText('canvas', 60, 80);
    Resource.remove(key); // free the old one before the key is used again
    const { url } = Resource.setImage(key, canvas);
    image?.destroy();
    image = new Image({ url, x: stage.width * 0.2, y: 16, width: stage.width * 0.6, height: stage.width * 0.6 * 0.7, cornerRadius: 10 });
    leafer.add(image);
    say(`Resource.setImage('${key.slice(10)}', canvas)\n -> url ${url.slice(0, 26)}...`);
    hue = (hue + 60) % 360;
  };
  paint();
  stage.onDispose(() => Resource.remove(key));
  if (stage.bar) button(stage.bar, 'repaint', paint);
  else stage.every(2200, paint);
  return stage.dispose;
};

export default mount;

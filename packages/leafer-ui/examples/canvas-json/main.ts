// Canvas: JSON export holds a base64 image url
import { Canvas, ImageEvent, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press export to clone the canvas through its JSON.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.7;
  const canvas = new Canvas({ x: stage.width / 4 - S / 2, y: stage.height / 2 - S / 2 - 10, width: 100, height: 100, scale: S / 100 });
  leafer.add(canvas);
  const { context } = canvas;
  context.fillStyle = '#32cd79';
  context.fillRect(10, 10, 80, 80);
  context.fillStyle = '#FEB027';
  context.beginPath();
  context.arc(50, 50, 25, 0, Math.PI * 2);
  context.fill();
  canvas.paint();
  const note = caption(stage, leafer);
  let copy: Canvas | undefined;
  const run = (): void => {
    copy?.destroy();
    const json = canvas.toJSON(); // the pixels become json.url, a data URL
    copy = new Canvas({ ...json, x: (stage.width * 3) / 4 - S / 2 });
    copy.once(ImageEvent.LOADED, () => (note.text = `url ${String(json.url).length} chars, clone ready: ${copy!.ready}`));
    leafer.add(copy);
  };
  if (stage.bar) button(stage.bar, 'export', run);
  else stage.every(2500, run);
  run();

  return stage.dispose;
};

export default mount;

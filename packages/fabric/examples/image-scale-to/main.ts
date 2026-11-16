// scaleToWidth(px) and scaleToHeight(px) scale an image uniformly to a target size
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'Both methods set scaleX and scaleY together from the image\'s own pixel size, so the picture never distorts.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const image = new FabricImage(picture('landscape', 320, 220), { left: 160, top: 110 });
  canvas.add(image);

  const state = { by: 'scaleToWidth' as 'scaleToWidth' | 'scaleToHeight', px: 200 };
  const apply = (): void => {
    if (state.by === 'scaleToWidth') image.scaleToWidth(state.px);
    else image.scaleToHeight(state.px);
    image.setCoords();
    say(`${state.by}(${state.px.toFixed(0)}) → scale ${image.scaleX.toFixed(3)}\ndisplayed ${image.getScaledWidth().toFixed(0)} × ${image.getScaledHeight().toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply();
  if (stage.bar) {
    select(stage.bar, 'method', ['scaleToWidth', 'scaleToHeight'], (v) => ((state.by = v), apply()));
    slider(stage.bar, 'pixels', 40, 300, 1, 200, (v) => ((state.px = v), apply()));
  } else {
    stage.loop((_dt, t) => {
      state.by = Math.floor(t / 2.5) % 2 ? 'scaleToHeight' : 'scaleToWidth';
      state.px = 150 + 70 * Math.sin(t * 1.6);
      apply();
    });
  }

  return stage.dispose;
};

export default mount;

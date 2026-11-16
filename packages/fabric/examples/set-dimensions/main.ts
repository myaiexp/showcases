// Canvas: setDimensions() resizes the canvas element, and cssOnly changes only how large it is shown
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The objects keep their size: a smaller canvas crops them, a larger one shows more room. With cssOnly the pixel size stays and the canvas is stretched, so it gets blurry.' });
  const canvas = stage.own(new Canvas(stage.el, { backgroundColor: '#fff' }));
  const say = status(stage);
  const { width: w0, height: h0 } = stage;
  canvas.add(
    new Rect({ left: w0 * 0.3, top: h0 / 2, width: 70, height: 70, fill: '#3b7dd8', angle: 15 }),
    new Circle({ left: w0 * 0.65, top: h0 / 2, radius: 40, fill: '#e94b3c' }),
  );

  const state = { width: w0, height: h0, css: false };
  const resize = (): void => {
    const { width, height } = state;
    if (state.css) canvas.setDimensions({ width: `${width}px`, height: `${height}px` }, { cssOnly: true });
    else canvas.setDimensions({ width, height });
    stage.frame.style.width = `${width}px`;
    stage.frame.style.height = `${height}px`;
    say(`${state.css ? 'cssOnly, buffer stays ' : 'size '}${canvas.getWidth()} × ${canvas.getHeight()}`);
  };
  resize();
  if (stage.bar) {
    slider(stage.bar, 'width', 120, w0, 1, w0, (v) => ((state.width = v), resize()));
    slider(stage.bar, 'height', 100, h0, 1, h0, (v) => ((state.height = v), resize()));
    select(stage.bar, 'mode', ['backstore and css', 'cssOnly'], (v) => {
      state.css = v === 'cssOnly';
      canvas.setDimensions({ width: w0, height: h0 }); // back to the real size first
      resize();
    });
  } else {
    stage.loop((_dt, t) => {
      state.width = Math.round(w0 * (0.8 + 0.2 * Math.sin(t * 1.3)));
      state.height = Math.round(h0 * (0.85 + 0.15 * Math.cos(t * 1.1)));
      resize();
    });
  }

  return stage.dispose;
};

export default mount;

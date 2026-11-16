// The canvas clip also clips controls, unless controlsAboveOverlay is true
import { Canvas, Circle, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { quad } from '../../shared/clip.ts';
import { checkbox } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 240], hint: 'Select the group: with the flag off its handles vanish outside the circle.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const group = quad(150, 120, { scaleX: 0.9, scaleY: 0.9 });
  canvas.clipPath = new Circle({ radius: 80, left: 150, top: 120 });
  canvas.add(group);
  canvas.setActiveObject(group);

  const setFlag = (on: boolean): void => {
    canvas.controlsAboveOverlay = on;
    say(`controlsAboveOverlay = ${on}`);
    canvas.requestRenderAll();
  };
  setFlag(false);

  if (stage.bar) checkbox(stage.bar, 'controlsAboveOverlay', false, setFlag);
  else {
    const ghost = stage.ghost(canvas);
    let on = false;
    stage.repeat(async () => {
      on = !on;
      setFlag(on);
      const br = controlPoint(group, 'br');
      await ghost.drag(br, br.add(new Point(-20, -16)), 700);
      await ghost.drag(controlPoint(group, 'br'), br, 700);
      await stage.wait(900);
    }, 100);
  }
  return stage.dispose;
};

export default mount;

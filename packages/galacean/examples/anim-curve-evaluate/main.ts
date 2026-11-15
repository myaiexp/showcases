// AnimationCurve.evaluate(time) samples a curve, plotted live
import { AnimationFloatCurve, InterpolationType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { overlayLayer } from '../../shared/core-ui.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root, cube, say } = await cubeStage(el, ctx, { size: 1 });
  const curve = new AnimationFloatCurve();
  keys(curve, [[0, 0], [1, 2.2], [2, 0.4], [3, 1.6], [4, 0]]);
  curve.interpolation = InterpolationType.CubicSpine;
  const canvas = document.createElement('canvas');
  canvas.width = 220;
  canvas.height = 110;
  canvas.style.cssText = 'position:absolute;right:8px;bottom:8px;background:rgba(10,14,22,.75);border-radius:4px';
  overlayLayer(stage).append(canvas);
  stage.own(() => canvas.remove());
  const g = canvas.getContext('2d')!;
  tick(root, (_dt, t) => {
    const time = t % 4;
    const y = curve.evaluate(time);
    cube.transform.setPosition(0, y - 0.2, 0);
    g.clearRect(0, 0, 220, 110);
    g.strokeStyle = '#7aa2ff';
    g.beginPath();
    for (let i = 0; i <= 100; i++) {
      const px = 10 + i * 2;
      const py = 100 - (curve.evaluate((i / 100) * 4) / 2.5) * 90;
      if (i) g.lineTo(px, py);
      else g.moveTo(px, py);
    }
    g.stroke();
    g.fillStyle = '#ffb347';
    g.beginPath();
    g.arc(10 + (time / 4) * 200, 100 - (y / 2.5) * 90, 5, 0, 7);
    g.fill();
    say(`curve.evaluate(${time.toFixed(2)}) = ${y.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;

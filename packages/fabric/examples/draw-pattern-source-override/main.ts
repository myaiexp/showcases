// Overriding PatternBrush.getPatternSrc: a tile in the brush colour
import { Canvas, PatternBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, color, slider } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'getPatternSrc() runs for every stroke, so an override can paint the tile in the current brush color. Change the color or the gap and draw again.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PatternBrush(canvas);
  brush.width = 28;
  brush.color = '#2e86c1';
  let gap = 6;

  // Replaces the default dot tile (20 px dots, 5 px apart) on this instance only.
  brush.getPatternSrc = () => {
    const size = 14 + gap;
    const tile = document.createElement('canvas');
    tile.width = tile.height = size;
    const c = tile.getContext('2d')!;
    c.fillStyle = brush.color;
    c.beginPath();
    c.moveTo(7, 0);
    c.lineTo(14, 7);
    c.lineTo(7, 14);
    c.lineTo(0, 7);
    c.closePath();
    c.fill();
    return tile;
  };
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const show = (): void => say(`diamond tile in ${brush.color}, gap ${gap}px`);
  show();

  if (stage.bar) {
    color(stage.bar, 'color', '#2e86c1', (v) => ((brush.color = v), show()));
    slider(stage.bar, 'gap', 0, 20, 1, 6, (v) => ((gap = v), show()));
    slider(stage.bar, 'width', 6, 70, 1, 28, (v) => (brush.width = v));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const colors = ['#2e86c1', '#e67e22', '#27ae60'];
    let n = 0;
    stage.repeat(async () => {
      brush.color = colors[n % colors.length]!;
      gap = [6, 0, 12][n++ % 3]!;
      show();
      await ghost.stroke(wave(40, 320, 90, 30, 1), 1000);
      await ghost.stroke(loop(180, 165, 34, 1), 800);
      await stage.wait(800);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;

// Free drawing: SprayBrush with width, density, dotWidth and randomOpacity
import { Canvas, SprayBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox, color, slider } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag to spray. Each move adds `density` small squares inside the brush width; the stroke ends as a Group of Rects.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new SprayBrush(canvas);
  brush.color = '#d35400';
  brush.width = 40;
  brush.density = 20;
  brush.dotWidth = 2;
  brush.randomOpacity = false;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const show = (): void =>
    say(
      stage.preview
        ? `density ${brush.density} · dotWidth ${brush.dotWidth}${brush.randomOpacity ? ' · random' : ''}`
        : `width ${brush.width} · density ${brush.density} · dotWidth ${brush.dotWidth} · randomOpacity ${brush.randomOpacity}`,
    );
  show();

  if (stage.bar) {
    color(stage.bar, 'color', '#d35400', (v) => (brush.color = v));
    slider(stage.bar, 'width', 5, 120, 1, 40, (v) => ((brush.width = v), show()));
    slider(stage.bar, 'density', 1, 100, 1, 20, (v) => ((brush.density = v), show()));
    slider(stage.bar, 'dotWidth', 1, 12, 1, 2, (v) => ((brush.dotWidth = v), show()));
    checkbox(stage.bar, 'randomOpacity', false, (v) => ((brush.randomOpacity = v), show()));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    // Cycle three presets: sparse, dense, big soft dots.
    const presets = [
      { density: 10, dotWidth: 2, randomOpacity: false, width: 40 },
      { density: 40, dotWidth: 2, randomOpacity: false, width: 40 },
      { density: 15, dotWidth: 7, randomOpacity: true, width: 44 },
    ];
    let n = 0;
    stage.repeat(async () => {
      Object.assign(brush, presets[n++ % presets.length]);
      show();
      await ghost.stroke(wave(40, 320, 90, 30, 1), 1000);
      await ghost.stroke(loop(180, 160, 36, 1), 800);
      await stage.wait(700);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;

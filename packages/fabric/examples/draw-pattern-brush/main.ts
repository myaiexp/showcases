// Free drawing: PatternBrush strokes with a tile you paint yourself, set as brush.source
import { Canvas, PatternBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { loop, wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Tile = 'stripes' | 'checker' | 'dots';

/** Paints a small repeating tile on a canvas element: the brush repeats it along the stroke. */
function paintTile(kind: Tile): HTMLCanvasElement {
  const tile = document.createElement('canvas');
  tile.width = tile.height = 16;
  const c = tile.getContext('2d')!;
  c.fillStyle = '#fdf0c8';
  c.fillRect(0, 0, 16, 16);
  c.fillStyle = '#c0392b';
  if (kind === 'stripes') {
    c.fillRect(0, 0, 16, 5);
  } else if (kind === 'checker') {
    c.fillRect(0, 0, 8, 8);
    c.fillRect(8, 8, 8, 8);
  } else {
    c.beginPath();
    c.arc(8, 8, 4, 0, Math.PI * 2);
    c.fill();
  }
  return tile;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag to draw. brush.source is a canvas element painted in code; getPattern() repeats it along the stroke.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PatternBrush(canvas);
  brush.width = 26;
  brush.source = paintTile('stripes');
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const pick = (kind: Tile): void => {
    brush.source = paintTile(kind);
    say(`source: ${kind} tile, 16 x 16`);
  };
  pick('stripes');

  if (stage.bar) {
    select(stage.bar, 'tile', ['stripes', 'checker', 'dots'] as const, pick);
    slider(stage.bar, 'width', 6, 70, 1, 26, (v) => (brush.width = v));
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    const kinds: Tile[] = ['stripes', 'checker', 'dots'];
    let n = 0;
    stage.repeat(async () => {
      pick(kinds[n++ % kinds.length]!);
      await ghost.stroke(wave(40, 320, 90, 30, 1), 1000);
      await ghost.stroke(loop(180, 165, 34, 1), 800);
      await stage.wait(800);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;

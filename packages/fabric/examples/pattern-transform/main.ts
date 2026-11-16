// Patterns: patternTransform scales, rotates or skews the tile with a matrix
import { Canvas, Circle, Pattern, util, type TMat2D } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tile } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'patternTransform is a 2D matrix applied to the pattern only (the object is not touched). It is the same kind of matrix SVG imports use.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const pattern = new Pattern({ source: tile('checks', 30, '#e94b3c', '#f6f3ec'), repeat: 'repeat' });
  const disc = new Circle({ left: 180, top: 120, radius: 100, fill: pattern, stroke: '#2b2b2b', strokeWidth: 2 });
  canvas.add(disc);

  const apply = (angle: number, scale: number): void => {
    pattern.patternTransform = util.composeMatrix({ angle, scaleX: scale, scaleY: scale }) as TMat2D;
    disc.dirty = true;
    say(`patternTransform [${pattern.patternTransform.map((n) => n.toFixed(2)).join(', ')}]`);
    canvas.requestRenderAll();
  };

  apply(0, 1);
  if (stage.preview) stage.loop((_dt, t) => apply(t * 30, 1 + 0.5 * Math.sin(t * 1.5)));
  else {
    let angle = 0, scale = 1;
    slider(stage.bar!, 'rotate', 0, 360, 1, angle, (v) => apply((angle = v), scale), (v) => `${v}°`);
    slider(stage.bar!, 'scale', 0.3, 3, 0.05, scale, (v) => apply(angle, (scale = v)), (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;

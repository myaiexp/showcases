// PathCreator: starting from existing path data
import { Leafer, Path, PathCreator } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Green is the part you start with; the creator adds the rest in white. The heart is the same either way.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 1.3 : 2;
  const x = (stage.width - 100 * k) / 2;
  const say = label(stage, '', true);
  leafer.add(new Path({ x, y: 10, scale: k, path: 'X 0 0 100 100 30', fill: '#444' }));

  let heart: Path | undefined;
  let head: Path | undefined;
  pick(stage, 'start from', ['path string', 'numeric data'] as const, (from) => {
    heart?.destroy();
    head?.destroy();
    const pathString = 'M 40, 30 C 70, 30, 90, 60, 63, 80';
    const numeric = [1, 40, 30, 5, 70, 30, 90, 60, 63, 80]; // M x y, C x1 y1 x2 y2 x y as numbers
    const start = from === 'path string' ? pathString : numeric;
    const drawer = new PathCreator(start as never);
    drawer.quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30);
    head = new Path({ x, y: 10, scale: k, path: start as never, stroke: '#32cd79', strokeWidth: 3 });
    heart = new Path({ x, y: 10, scale: k, path: drawer.path, fill: 'white', opacity: 0.9 });
    leafer.add([heart, head]);
    say(from === 'path string' ? `new PathCreator('${pathString}')` : `new PathCreator([${numeric.join(', ')}])`);
  }, 2800);
  return stage.dispose;
};

export default mount;

// PathCreator: joined versus independent arcs, and drawPoints
import { Leafer, Path, PathCreator } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'After moveTo(10, 60), a plain arc() draws a line to the arc start; drawArc() does not. drawPoints makes the zig-zag.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 1.1 : 1.8;
  const say = label(stage, '', true);
  const path = new Path({ x: stage.width * 0.1, y: 10, scale: k, stroke: '#4B8BFF', strokeWidth: 3 });
  leafer.add(path);

  const forms: Record<string, () => PathCreator> = {
    'arc(): joined to the start': () => new PathCreator().moveTo(10, 60).arc(80, 40, 28, 0, 270),
    'drawArc(): its own piece': () => new PathCreator().moveTo(10, 60).drawArc(80, 40, 28, 0, 270),
    'drawEllipse()': () => new PathCreator().moveTo(10, 60).drawEllipse(80, 40, 40, 22, 20),
    'drawPoints(points)': () => new PathCreator().drawPoints([10, 60, 40, 10, 70, 60, 100, 10, 130, 60]),
    'drawPoints(points, true)': () => new PathCreator().drawPoints([10, 60, 40, 10, 70, 60, 100, 10, 130, 60], true),
  };
  pick(stage, 'call', Object.keys(forms), (name) => {
    path.path = forms[name]!().path;
    say(`new PathCreator().moveTo(10, 60).${name.split(':')[0]}`);
  }, 2000);
  return stage.dispose;
};

export default mount;

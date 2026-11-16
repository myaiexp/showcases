// Motion: the track can be an Ellipse, Polygon, Star or Line
import { Ellipse, Group, Leafer, Line, Polygon, Star, type IUI } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { follower } from '../../shared/motion-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each follower has the same animation; only the shape marked motionPath changes.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);
  const r = Math.min(stage.width, stage.height) * 0.34;
  const at = { x: stage.width / 2 - r, y: stage.height / 2 - r - 6 };
  const style = { stroke: 'rgba(0,0,0,0.3)', strokeWidth: 3, motionPath: true, ...at };
  const makers: Record<string, () => IUI> = {
    Ellipse: () => new Ellipse({ ...style, width: r * 2, height: r * 2 }),
    Polygon: () => new Polygon({ ...style, width: r * 2, height: r * 2, sides: 5 }),
    Star: () => new Star({ ...style, width: r * 2, height: r * 2, corners: 5 }),
    Line: () => new Line({ ...style, y: stage.height / 2 - 6, x: 24, width: stage.width - 48, rotation: 0 }),
  };
  let group: Group | undefined;
  pick(stage, 'track', Object.keys(makers), (name) => {
    if (group) leafer.remove(group);
    group?.destroy();
    group = new Group();
    const arrow = (offset: number) =>
      follower(stage, {
        around: 'center',
        motion: 0,
        animation: { style: { motion: { type: 'percent', value: 1 } }, duration: 5, loop: true, easing: 'linear', delay: offset },
      });
    group.add([makers[name]!(), arrow(0), arrow(1.2)]);
    leafer.add(group);
    say(`new ${name}({ motionPath: true })`);
  }, 3200);
  return stage.dispose;
};

export default mount;

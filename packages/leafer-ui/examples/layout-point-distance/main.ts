// Layout: the distance argument converts a movement, not a position
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive, toggle } from '../../shared/shapes.ts';
import { pt } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The group is scaled 5. A movement of 100 on the canvas is 20 inside it, while the point (100, 100) is at (10, 10): the origin counts for points, not for distances.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group({ x: 50, y: 50, scale: stage.preview ? 3 : 5 });
  group.add(new Rect({ width: stage.preview ? 20 : 24, height: stage.preview ? 20 : 24, fill: '#32cd79' }));
  leafer.add(group);
  const show = label(stage, '', true);
  let distance = true, amount = 100;
  const refresh = (): void => {
    const inner = group.getInnerPoint({ x: amount, y: amount }, undefined, distance);
    show(`group.getInnerPoint({ x: ${amount}, y: ${amount} }, undefined, ${distance})\n-> ${pt(inner)}   (${distance ? 'a movement' : 'a position'})`);
  };
  toggle(stage, 'distance', distance, (v) => ((distance = v), refresh()), 2000);
  drive(stage, 'world value', [20, 200, 1], amount, (v) => ((amount = v), refresh()), 6);

  return stage.dispose;
};

export default mount;

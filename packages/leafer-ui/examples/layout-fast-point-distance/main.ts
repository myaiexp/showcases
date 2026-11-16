// Layout: the quick conversions can turn a movement into a local movement
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { drive, toggle } from '../../shared/shapes.ts';
import { pt } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The group is scaled 2: a world movement of 10 is 5 locally. The third argument asks for the movement rather than the position.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group({ x: 100, y: 20, scale: 2 });
  group.add(new Rect({ x: 10, y: 10, width: 24, height: 24, fill: '#32cd79', draggable: true }));
  leafer.add(group);
  const rect = group.children[0] as Rect;
  const show = label(stage, '', true);
  let distance = true, amount = 10;
  const refresh = (): void => {
    const worldMove = { x: amount, y: amount }, localMove = { x: 0, y: 0 };
    rect.worldToLocal(worldMove, localMove, distance);
    show(`rect.worldToLocal({ x: ${amount}, y: ${amount} }, localMove, ${distance})\nlocalMove ${pt(localMove)}`);
  };
  toggle(stage, 'distance', distance, (v) => ((distance = v), refresh()), 2000);
  drive(stage, 'world movement', [0, 100, 1], amount, (v) => ((amount = v), refresh()), 5);

  return stage.dispose;
};

export default mount;

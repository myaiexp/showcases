// Layout: the to argument keeps the input point and stores the result elsewhere
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { toggle } from '../../shared/shapes.ts';
import { pt } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'rect.worldToLocal(point, to) leaves point alone and writes the result into to.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group({ x: 100, y: 20, scale: 2 });
  group.add(new Rect({ x: 10, y: 10, width: 24, height: 24, fill: '#32cd79' }));
  leafer.add(group);
  const rect = group.children[0] as Rect;
  const show = label(stage, '', true);
  let useTo = true;
  const run = (): void => {
    const point = { x: 100, y: 100 }, to = { x: 0, y: 0 };
    if (useTo) rect.worldToLocal(point, to);
    else rect.worldToLocal(point);
    show(`const point = { x: 100, y: 100 }, to = { x: 0, y: 0 }\nrect.worldToLocal(point${useTo ? ', to' : ''})\npoint ${pt(point)}   to ${pt(to)}`);
  };
  toggle(stage, 'pass a `to` point', useTo, (v) => ((useTo = v), run()), 2000);

  return stage.dispose;
};

export default mount;

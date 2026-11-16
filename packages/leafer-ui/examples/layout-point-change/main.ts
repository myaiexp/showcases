// Layout: the change argument writes the result into the input point
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { toggle } from '../../shared/shapes.ts';
import { pt } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With change true the point you pass in is rewritten and returned: no new object, but your input is gone.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group({ x: 50, y: 50, scale: 3 });
  group.add(new Rect({ width: 24, height: 24, fill: '#32cd79' }));
  leafer.add(group);
  const show = label(stage, '', true);
  let change = false;
  const run = (): void => {
    const input = { x: 100, y: 100 };
    const result = group.getInnerPoint(input, undefined, false, change);
    show(`const input = { x: 100, y: 100 }\nconst result = group.getInnerPoint(input, undefined, false, ${change})\ninput  ${pt(input)}\nresult ${pt(result)}   same object: ${input === result}`);
  };
  toggle(stage, 'change', change, (v) => ((change = v), run()), 2000);

  return stage.dispose;
};

export default mount;

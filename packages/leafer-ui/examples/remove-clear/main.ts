// Basics: clearing every element
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'All children are cleared together, then rebuilt.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const fill = (): void => {
    leafer.addMany(Rect.one({ fill: '#32cd79' }, u(60), u(60), u(100), u(100)), Rect.one({ fill: 'blue' }, u(170), u(60), u(100), u(100)));
  };
  fill();
  const say = label(stage, '', true);

  stage.every(1400, () => {
    if (leafer.children.length) leafer.clear(); // remove + destroy all children
    else fill();
    say(`children: ${leafer.children.length}`);
  });

  return stage.dispose;
};

export default mount;

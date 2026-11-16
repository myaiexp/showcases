// Basics: removing an element with remove()
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rect is removed, then added back.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = Rect.one({ fill: '#32cd79' }, u(100), u(60), u(100), u(100));
  leafer.add(rect);

  stage.every(1200, () => {
    if (rect.parent) rect.remove(); // same as leafer.remove(rect)
    else leafer.add(rect);
  });

  return stage.dispose;
};

export default mount;

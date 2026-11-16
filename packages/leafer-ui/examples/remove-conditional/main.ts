// Basics: conditional removal through the find plugin
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/find'; // the find element plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The green rect (id "book") is removed by selector.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = Rect.one({ id: 'book', fill: '#32cd79' }, u(60), u(60), u(100), u(100));
  const rect2 = Rect.one({ fill: 'blue' }, u(170), u(60), u(100), u(100));
  leafer.addMany(rect, rect2);

  // Remove by selector; the card puts the rect back and repeats.
  stage.every(1800, () => {
    if (rect.parent) leafer.remove('#book');
    else leafer.add(rect);
  });

  return stage.dispose;
};

export default mount;

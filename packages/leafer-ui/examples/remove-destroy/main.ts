// Basics: destroying an element
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rect is destroyed; a new one appears.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  let rect = Rect.one({ fill: '#32cd79' }, u(100), u(60), u(100), u(100));
  leafer.add(rect);

  stage.every(1400, () => {
    if (!rect.destroyed) rect.destroy(); // same as rect.remove() then destroy
    else leafer.add((rect = Rect.one({ fill: '#32cd79' }, u(100), u(60), u(100), u(100))));
  });

  return stage.dispose;
};

export default mount;

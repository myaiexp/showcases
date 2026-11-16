// Basics: Rect.one(data, x, y, width, height)
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The simple creation form: Rect.one(data, x?, y?, width?, height?).' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  // Element.one(data, x?, y?, width?, height?)
  const rect = Rect.one({ fill: GREEN }, u(100), u(50), u(100), u(100));
  leafer.add(rect);

  if (stage.preview) bob(stage, rect);

  return stage.dispose;
};

export default mount;

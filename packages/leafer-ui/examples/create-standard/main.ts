// Basics: new Rect({...}) then leafer.add()
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The standard creation form: a data object passed to the Rect constructor.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(50),
    width: u(100),
    height: u(100),
    fill: GREEN, // background colour
  });
  leafer.add(rect);

  if (stage.preview) bob(stage, rect);

  return stage.dispose;
};

export default mount;

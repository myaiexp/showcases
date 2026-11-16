// Basics: leafer.add({ tag: "Rect", ... })
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Data with a class tag: leafer.add({ tag: "Rect", ... }) needs no constructor call.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  leafer.add({
    tag: 'Rect', // the class name is required
    x: u(100),
    y: u(50),
    width: u(100),
    height: u(100),
    fill: GREEN,
  });

  if (stage.preview) bob(stage, leafer.children[0] as Rect);

  return stage.dispose;
};

export default mount;

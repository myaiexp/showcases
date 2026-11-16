// Basics: the leafer-ui quick start
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the rounded rect.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(80),
    y: u(40),
    width: u(160),
    height: u(160),
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
  });
  leafer.add(rect);

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(160), y: u(120) }, { x: u(230), y: u(140) });

  return stage.dispose;
};

export default mount;

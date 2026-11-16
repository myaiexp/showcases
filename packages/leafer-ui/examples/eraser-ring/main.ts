// Basics: a ring element used as an eraser
import { Leafer, Group, Ellipse, Image } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the ring over the picture.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const group = new Group({ x: u(70), y: u(30), draggable: true });

  const image = new Image({ width: u(130), height: u(130), cornerRadius: 30, url: photo() });
  const eraser = new Ellipse({
    x: u(20),
    y: u(20),
    width: u(90),
    height: u(90),
    innerRadius: 0.5,
    fill: 'black',
    eraser: true, // removes what is drawn before it
    draggable: true,
  });

  leafer.add(group);
  group.add([image, eraser]);

  if (stage.preview) {
    // Press on the ring itself (its left edge) and pull it across the picture.
    dragToAndFro(stage, leafer, { x: u(70 + 22), y: u(30 + 65) }, { x: u(70 + 80), y: u(30 + 70) });
  }

  return stage.dispose;
};

export default mount;

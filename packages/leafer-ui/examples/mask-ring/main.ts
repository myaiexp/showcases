// Basics: a ring element used as a mask
import { Leafer, Group, Ellipse, Image } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The picture shows through the ring only.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const group = new Group({ x: u(70), y: u(30) });

  const mask = new Ellipse({
    width: u(130),
    height: u(130),
    innerRadius: 0.5,
    fill: 'black',
    mask: true, // clips the siblings drawn after it
  });
  const image = new Image({ width: u(130), height: u(130), url: photo() });

  leafer.add(group);
  group.add([mask, image]);

  if (stage.preview) stage.loop((_dt, t) => (mask.innerRadius = 0.5 + Math.sin(t * 2) * 0.3));
  else slider(stage.bar!, 'innerRadius', 0, 0.9, 0.05, 0.5, (v) => (mask.innerRadius = v));

  return stage.dispose;
};

export default mount;

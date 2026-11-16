// Appearance: a mask Group made of two circles
import { Leafer, Group, Ellipse, Image } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the second circle." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const group = new Group(mid(stage, S));
  const maskGroup = new Group({ mask: true });
  const first = new Ellipse({ width: S * 0.6, height: S * 0.6, fill: 'black' });
  const second = new Ellipse({ x: S * 0.5, y: S * 0.5, width: S / 2, height: S / 2, fill: 'black' });
  maskGroup.add([first, second]);
  const image = new Image({ width: S, height: S, url: photo() });
  leafer.add(group);
  group.add([maskGroup, image]);
  drive(stage, 'second.x', [0, S * 0.6, 1], S * 0.5, (v) => (second.x = v), 5);

  return stage.dispose;
};

export default mount;

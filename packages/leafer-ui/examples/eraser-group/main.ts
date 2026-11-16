// Appearance: an eraser Group made of two circles
import { Leafer, Group, Ellipse, Image } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the second circle." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage);
  const S = size(stage);
  const group = new Group(mid(stage, S));
  const eraserGroup = new Group({ x: S * 0.2, y: S * 0.2, eraser: true });
  const first = new Ellipse({ width: S * 0.4, height: S * 0.4, fill: 'black' });
  const second = new Ellipse({ x: S * 0.3, y: S * 0.3, width: S * 0.3, height: S * 0.3, fill: 'black' });
  eraserGroup.add([first, second]);
  const image = new Image({ width: S, height: S, cornerRadius: S * 0.3, url: photo() });
  leafer.add(group);
  group.add([image, eraserGroup]);
  drive(stage, 'second.x', [0, S * 0.5, 1], S * 0.3, (v) => (second.x = v), 5);

  return stage.dispose;
};

export default mount;

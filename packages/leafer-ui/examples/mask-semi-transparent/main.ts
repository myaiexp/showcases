// Appearance: a mask element with opacity below 1
import { Leafer, Group, Ellipse, Image } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the mask opacity." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage);
  const S = size(stage);
  const group = new Group(mid(stage, S));
  const mask = new Ellipse({ width: S, height: S, innerRadius: 0.5, opacity: 0.5, fill: 'black', mask: true });
  const image = new Image({ width: S, height: S, url: photo() });
  leafer.add(group);
  group.add([mask, image]);
  drive(stage, 'mask.opacity', [0, 1, 0.05], 0.5, (v) => (mask.opacity = v), 5);

  return stage.dispose;
};

export default mount;

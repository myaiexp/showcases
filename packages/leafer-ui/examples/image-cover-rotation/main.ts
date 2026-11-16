// Appearance: rotating an image fill by 90 degrees
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a rotation." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  pick(stage, 'rotation', ['0', '90', '180', '270'], (deg) => {
    rect.fill = { type: 'image', url: photo(), rotation: Number(deg) };
  }, 1500, '90');

  return stage.dispose;
};

export default mount;

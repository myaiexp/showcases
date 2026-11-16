// Appearance: image size as a number, width, height or both
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a size form." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const forms = {
    '60': 60,
    '{ width: 160 }': { width: 160 },
    '{ height: 80 }': { height: 80 },
    '{ width: 160, height: 60 }': { width: 160, height: 60 },
  };
  pick(stage, 'size', Object.keys(forms) as (keyof typeof forms)[], (k) => {
    rect.fill = { type: 'image', url: photo(), mode: 'clip', size: forms[k] };
  }, 1700);

  return stage.dispose;
};

export default mount;

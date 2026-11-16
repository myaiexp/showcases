// Layout: renderSpread widens the render bounds
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, pick } from '../../shared/shapes.ts';
import { box, outline } from '../../shared/layout-kit.ts';

const FORMS: Record<string, number | number[]> = {
  '0': 0,
  '20': 20,
  '[20, 10]': [20, 10],
  '[20, 10, 20]': [20, 10, 20],
  '[20, 10, 20, 10]': [20, 10, 20, 10],
  '[40, 0, 0, 0]': [40, 0, 0, 0],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'renderSpread grows renderBounds only (the dashed box), never boxBounds. The forms are [top, right, bottom, left] with CSS-style shortcuts.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const rect = new Rect({ ...mid(stage, S, S), y: 40, width: S, height: S, fill: '#32cd79', cornerRadius: 8 });
  leafer.add(rect);
  const guide = outline(leafer);
  const show = label(stage, '', true);
  pick(stage, 'renderSpread', Object.keys(FORMS), (name) => {
    rect.renderSpread = FORMS[name] as never;
    stage.after(60, () => {
      guide.show(rect.worldRenderBounds);
      show(`renderSpread: ${name}\nboxBounds ${box(rect.boxBounds)}\nrenderBounds ${box(rect.renderBounds)}`);
    });
  }, 1700, '[20, 10]');

  return stage.dispose;
};

export default mount;

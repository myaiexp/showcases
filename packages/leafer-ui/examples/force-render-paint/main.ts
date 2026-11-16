// forceRender: redrawing after changing a fill object behind the element's back
import { Leafer, Rect } from 'leafer-ui';
import type { IGradientPaint } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each click recolours the gradient stops inside the fill object. Without forceRender() the canvas keeps the old picture.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const w = Math.min(stage.width - 40, 220);
  const h = stage.preview ? 100 : 150;
  const paint: IGradientPaint = {
    type: 'linear',
    stops: [
      { offset: 0, color: '#32cd79' },
      { offset: 1, color: '#feb027' },
    ],
  };
  const rect = new Rect({ ...mid(stage, w, h), width: w, height: h, cornerRadius: 14, fill: paint });
  leafer.add(rect);
  const say = label(stage, '', true);

  let useForce = true;
  let n = 0;
  const next = (): void => {
    n++;
    const [a, b] = [(n * 67) % 360, (n * 67 + 140) % 360];
    const stops = (rect.fill as IGradientPaint).stops as { offset: number; color: string }[];
    stops[0]!.color = `hsl(${a} 70% 55%)`; // edit the paint in place: no setter runs
    stops[1]!.color = `hsl(${b} 80% 60%)`;
    if (useForce) rect.forceRender(); // render only, layout untouched
    say(`stops edited in place   forceRender() ${useForce ? 'called' : 'skipped'}`);
  };
  if (stage.bar) {
    checkbox(stage.bar, 'call forceRender()', true, (v) => (useForce = v));
    button(stage.bar, 'recolour stops', next);
  } else {
    stage.every(1300, next);
  }
  return stage.dispose;
};

export default mount;

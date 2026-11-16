// Bounds: collision, containment and the overlap box
import { Bounds, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, f1, outlineOf } from '../../shared/math-kit.ts';
import { probe } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer: the blue box follows it. The green box is the overlap from getIntersect().' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fixed = new Bounds(stage.width * 0.4, stage.height * 0.2, stage.width * 0.32, stage.height * 0.4);
  leafer.add(new Rect({ ...fixed.get(), fill: 'rgba(0,0,0,0.08)', stroke: '#777', hittable: false }));
  const moving = outlineOf(leafer, '#4B8BFF', 'rgba(75,139,255,0.15)');
  const overlap = new Rect({ fill: 'rgba(50,205,121,0.6)', hittable: false, visible: false });
  leafer.add(overlap);
  const say = label(stage, '', true);
  const w = stage.width * 0.22;
  const h = stage.height * 0.25;

  probe(stage, leafer, (p) => {
    const b = new Bounds(p.x - w / 2, p.y - h / 2, w, h);
    moving.set(cornersOf(b));
    const hit = fixed.hit(b);
    const inter = fixed.getIntersect(b);
    overlap.visible = hit;
    if (hit) overlap.set(inter.get());
    say(`fixed.hit(b) ${hit}\nfixed.includes(b) ${fixed.includes(b)}\ngetIntersect(b) ${hit ? `${f1(inter.width)} x ${f1(inter.height)}` : 'empty'}`);
  });
  return stage.dispose;
};

export default mount;

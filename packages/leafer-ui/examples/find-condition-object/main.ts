// find: the object form of a condition, with a list of tags
import { Ellipse, Leafer, Polygon, Rect, Star, type IUI } from 'leafer-ui';
import '@leafer-in/find'; // find(), findOne()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { RED } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Six shapes with ids and class names. The select changes the condition passed to leafer.find().' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 36 : 60;
  const gap = (stage.width - s * 3) / 4;
  const mk = (i: number, shape: IUI): IUI => {
    shape.set({ x: gap + (i % 3) * (s + gap), y: 18 + Math.floor(i / 3) * (s + (stage.preview ? 22 : 34)), width: s, height: s, fill: '#32cd79' });
    return shape;
  };
  const items = [
    mk(0, new Rect({ id: 'first', className: 'menu' })),
    mk(1, new Rect({ id: 'second' })),
    mk(2, new Ellipse({ className: 'menu' })),
    mk(3, new Ellipse({ id: 'fourth' })),
    mk(4, new Star({ className: 'menu' })),
    mk(5, new Polygon({ id: 'sixth', sides: 6 })),
  ];
  leafer.add(items);
  const say = label(stage, '', true);

  const conditions: Record<string, () => IUI[]> = {
    "find('#first')": () => leafer.find('#first'),
    "find({ className: 'menu' })": () => leafer.find({ className: 'menu' } as never),
    "find('Ellipse')": () => leafer.find('Ellipse'),
    "find({ tag: ['Rect', 'Star'] })": () => leafer.find({ tag: ['Rect', 'Star'] } as never),
    "findOne('.menu')": () => [leafer.findOne('.menu')].filter(Boolean) as IUI[],
  };
  pick(stage, 'condition', Object.keys(conditions), (name) => {
    for (const it of items) it.set({ stroke: '' });
    const hits = conditions[name]!();
    for (const hit of hits) hit.set({ stroke: RED, strokeWidth: 4 });
    say(`leafer.${name}  ->  ${hits.length}`);
  }, 2000);
  return stage.dispose;
};

export default mount;

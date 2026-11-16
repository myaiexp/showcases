// findOne: the first hit of the same search that find() lists in full
import { Leafer, Rect, Text, type IUI } from 'leafer-ui';
import '@leafer-in/find'; // find(), findOne()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { RED } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Squares with a black stroke match. Switch between find (all, in order) and findOne (the first).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const n = 6;
  const s = Math.min(stage.preview ? 32 : 56, (stage.width - 20) / n - 8);
  const items: Rect[] = [];
  for (let i = 0; i < n; i++) {
    const r = new Rect({ x: 14 + i * (s + 8), y: stage.height / 2 - s, width: s, height: s, fill: '#32cd79', cornerRadius: 6, stroke: i % 2 ? undefined : 'black' });
    items.push(r);
  }
  leafer.add(items);
  const marks = items.map((r) => new Text({ x: r.x, y: r.y! - 20, text: '', fontSize: 13, fill: '#d33', fontWeight: 'bold', hittable: false }));
  leafer.add(marks);
  const say = label(stage, '', true);

  pick(stage, 'method', ['find', 'findOne'] as const, (m) => {
    marks.forEach((t) => (t.text = ''));
    const test = (item: IUI): 0 | 1 => (item.stroke === 'black' ? 1 : 0);
    const hits: IUI[] = m === 'find' ? leafer.find(test) : ([leafer.findOne(test)].filter(Boolean) as IUI[]);
    hits.forEach((hit, k) => {
      marks[items.indexOf(hit as Rect)]!.text = `#${k + 1}`;
      hit.set({ fill: RED });
    });
    items.forEach((r) => !hits.includes(r) && r.set({ fill: '#32cd79' }));
    say(`leafer.${m}(item => item.stroke === 'black' ? 1 : 0) -> ${hits.length}`);
  }, 2200);
  return stage.dispose;
};

export default mount;

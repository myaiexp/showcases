// UI: search the tree by id, class, tag or function
import { Ellipse, Leafer, Rect, UI } from 'leafer-ui';
import '@leafer-in/find'; // find()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a query.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.3;
  const mk = (i: number, shape: 'Rect' | 'Ellipse', fill: string, className?: string, id?: string): UI =>
    (shape === 'Rect' ? new Rect({ className, id, x: 20 + i * (S + 14), y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill })
      : new Ellipse({ className, id, x: 20 + i * (S + 14), y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill }));
  const all = [mk(0, 'Rect', '#32cd79', 'good'), mk(1, 'Ellipse', '#FEB027', 'good', 'sun'), mk(2, 'Rect', '#FF4B4B'), mk(3, 'Ellipse', '#4B8BFF', 'good')];
  leafer.add(all);
  const note = caption(stage, leafer);
  const queries: Record<string, () => UI[]> = {
    "find('.good')": () => leafer.find('.good') as UI[],
    "findOne('.good')": () => [leafer.findOne('.good')].filter(Boolean) as UI[],
    "findId('sun')": () => [leafer.findId('sun')].filter(Boolean) as UI[],
    "findTag('Rect')": () => leafer.findTag('Rect') as UI[],
    'find(fn): fn returns 1 for a match': () => leafer.find((el) => ((el as UI).fill === '#4B8BFF' ? 1 : 0)) as UI[],
  };
  pick(stage, 'query', Object.keys(queries), (q) => {
    all.forEach((u) => (u.stroke = undefined));
    for (const hit of queries[q]!()) { hit.stroke = '#222'; hit.strokeWidth = 5; }
    note.text = q;
  }, 1600);

  return stage.dispose;
};

export default mount;

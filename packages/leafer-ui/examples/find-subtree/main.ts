// find: calling find on a group instead of the leafer narrows the search
import { Box, Leafer, Rect, type IUI } from 'leafer-ui';
import '@leafer-in/find'; // find(), findOne()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { RED } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every square has className "tile". Choose which element find(".tile") is called on.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const bw = Math.floor((stage.width - 30) / 2);
  const bh = stage.preview ? 110 : 320;
  const groups = [0, 1].map((i) => {
    const g = new Box({ x: 10 + i * (bw + 10), y: 14, width: bw, height: bh, fill: i ? 'rgba(75,139,255,0.12)' : 'rgba(50,205,121,0.14)', cornerRadius: 8 });
    const n = i ? 2 : 3;
    for (let j = 0; j < n; j++) g.add(new Rect({ className: 'tile', x: 10, y: 10 + j * (bh / 3.2), width: bw - 20, height: bh / 3.2 - 10, fill: i ? '#4B8BFF' : '#32cd79', cornerRadius: 4 }));
    return g;
  });
  leafer.add(groups);
  const say = label(stage, '', true);

  const starts: Record<string, () => IUI[]> = {
    'leafer.find': () => leafer.find('.tile'),
    'left.find': () => groups[0]!.find('.tile'),
    'right.find': () => groups[1]!.find('.tile'),
  };
  pick(stage, 'call it on', Object.keys(starts), (name) => {
    for (const g of groups) for (const t of g.children as IUI[]) t.set({ stroke: '' });
    const hits = starts[name]!();
    for (const hit of hits) hit.set({ stroke: RED, strokeWidth: 4 });
    say(`${name}('.tile') -> ${hits.length}`);
  }, 2000);
  return stage.dispose;
};

export default mount;

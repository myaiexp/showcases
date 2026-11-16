// find: a search function that answers 0 to 3, so whole branches can be skipped
import { Box, Leafer, Rect, type IUI } from 'leafer-ui';
import '@leafer-in/find'; // find(), findOne()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { RED } from '../../shared/event-kit.ts';

const OPTIONS = ['0: look inside', '2: skip the middle box', '3: take the middle box, skip inside'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Red outline = found. Squares are always taken; the middle box is answered with the chosen number.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const bw = Math.floor((stage.width - 40) / 3);
  const bh = stage.preview ? 100 : 300;
  const boxes: Box[] = [0, 1, 2].map((i) => {
    const box = new Box({ x: 10 + i * (bw + 10), y: 20, width: bw, height: bh, fill: 'rgba(0,0,0,0.05)', cornerRadius: 8, className: i === 1 ? 'middle' : 'side' });
    for (let j = 0; j < 3; j++) box.add(new Rect({ x: 8, y: 8 + j * (bh - 16) / 3, width: bw - 16, height: (bh - 16) / 3 - 8, fill: '#32cd79', cornerRadius: 4 }));
    return box;
  });
  leafer.add(boxes);
  const say = label(stage, '', true);

  const all = (): IUI[] => [...boxes, ...boxes.flatMap((b) => b.children as IUI[])];
  pick(stage, 'answer for the middle box', OPTIONS, (opt) => {
    const answer = Number(opt[0]) as 0 | 2 | 3;
    for (const it of all()) it.set({ stroke: '', strokeWidth: 0 });
    const hits = leafer.find((item: IUI) => {
      if (item.className === 'middle') return answer; // 0, 2 or 3
      return item.tag === 'Rect' ? 1 : 0;
    });
    for (const hit of hits) hit.set({ stroke: RED, strokeWidth: 4 });
    say(`find(fn) -> ${hits.length} found`);
  }, 2400);
  return stage.dispose;
};

export default mount;

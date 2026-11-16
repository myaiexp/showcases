// LeafList: copying a list and walking it
import { Leafer, LeafList, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The original list holds all six. Remove from the clone and the original keeps them; forEach paints each list.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = Math.min(36, (stage.width - 40) / 6 - 8);
  const rects = Array.from({ length: 6 }, (_, i) => new Rect({ x: 20 + i * (s + 8), y: 30, width: s, height: s, fill: '#ccc', cornerRadius: 6, hittable: false }));
  const row2 = rects.map((r) => new Rect({ x: r.x, y: 30 + s + 30, width: s, height: s, fill: '#ccc', cornerRadius: 6, hittable: false }));
  leafer.add([...rects, ...row2]);
  const original = new LeafList(rects);
  const say = label(stage, '', true);

  let copy = original.clone();
  const paint = (): void => {
    rects.forEach((r, i) => {
      r.fill = '#ddd';
      row2[i]!.fill = '#ddd';
    });
    let n = 0;
    original.forEach((leaf) => ((leaf as Rect).fill = `hsl(${150 + n++ * 25} 60% 55%)`));
    n = 0;
    copy.forEach((leaf) => {
      const at = rects.indexOf(leaf as Rect);
      row2[at]!.fill = `hsl(${220 + n++ * 25} 70% 60%)`;
    });
    say(`original.length ${original.length}\ncopy.length     ${copy.length}`);
  };
  let k = 0;
  const step = (): void => {
    if (k % 4 === 3 || copy.length <= 2) copy = original.clone();
    else copy.remove(rects[(k * 2) % 6]!);
    k++;
    paint();
  };
  paint();
  if (stage.bar) button(stage.bar, 'remove one from the clone', step);
  else stage.every(1200, step);
  return stage.dispose;
};

export default mount;

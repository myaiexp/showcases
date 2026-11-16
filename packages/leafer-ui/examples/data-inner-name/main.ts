// Data: innerName, the innerId plus the tag
import { Ellipse, Leafer, Rect, Star, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineUp } from '../../shared/layout-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each new shape gets the next innerName.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = stage.preview ? 50 : 80;

  const names = new Text({ x: 0, y: 14, width: stage.width, textAlign: 'center', fill: '#32cd79', fontSize: stage.preview ? 13 : 18, lineHeight: stage.preview ? 20 : 28, hittable: false });
  leafer.add(names);
  const added: (Rect | Ellipse | Star)[] = [];
  const add = (): void => {
    if (added.length >= 5) for (const it of added.splice(0)) it.destroy();
    const kind = [Rect, Ellipse, Star][added.length % 3]!;
    const ui = new kind({ width: S, height: S, fill: ['#32cd79', '#FEB027', '#FF4B4B'][added.length % 3] });
    added.push(ui);
    for (const it of added) it.remove();
    lineUp(stage, leafer, added);
    names.text = added.map((a) => a.innerName).join('   ');
  };
  add();
  if (stage.bar) button(stage.bar, 'add a shape', add);
  else stage.every(1000, add);

  return stage.dispose;
};

export default mount;

// Group: conditional removal with find
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/find'; // find()
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press remove #book, then reset.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.6;
  const make = (): void => {
    leafer.clear();
    const book = Rect.one({ id: 'book', fill: '#32cd79' }, stage.width / 2 - S * 1.3, stage.height / 2 - S / 2, S, S);
    const other = Rect.one({ fill: '#4B8BFF' }, stage.width / 2 + S * 0.3, stage.height / 2 - S / 2, S, S);
    leafer.addMany(book, other); // addMany(...elements)
  };
  const remove = (): void => {
    leafer.remove('#book'); // same as leafer.find('#book').forEach(item => item.remove())
  };
  make();
  if (stage.bar) {
    button(stage.bar, 'remove #book', remove);
    button(stage.bar, 'reset', make);
  } else {
    stage.every(3000, make);
    stage.every(3000, () => stage.after(1500, remove));
  }

  return stage.dispose;
};

export default mount;

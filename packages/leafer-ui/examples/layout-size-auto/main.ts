// Layout: width and height, and when they are automatic
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'isAutoWidth and isAutoHeight say whether the engine measures the size. Give a Text a width and that side is yours.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fs = stage.preview ? 15 : 24;
  const col = stage.width / 3;
  const items = [
    new Text({ text: 'auto', fontSize: fs, fill: '#32cd79' }),
    new Text({ text: 'width 70', width: stage.preview ? 54 : 100, fontSize: fs, fill: '#FEB027', stroke: undefined }),
    new Rect({ width: stage.preview ? 40 : 70, height: stage.preview ? 40 : 70, fill: '#4B8BFF' }),
  ];
  const names = ['Text', 'Text { width }', 'Rect'];
  const small = stage.preview ? 9 : 12;
  const readouts = items.map((it, i) => {
    it.set({ x: i * col + 10, y: stage.height * 0.3 });
    leafer.add(it);
    const t = new Text({ x: i * col + 6, y: stage.height * 0.58, width: col - 8, fontSize: small, fill: '#555', lineHeight: small * 1.5, hittable: false });
    leafer.add(new Text({ x: i * col + 6, y: stage.height * 0.58 - small * 2.2, width: col - 8, fontSize: small, fill: '#888', text: names[i], hittable: false }));
    leafer.add(t);
    return t;
  });
  const refresh = (): void =>
    items.forEach((it, i) => {
      readouts[i]!.text = `w ${Math.round(it.boxBounds.width)}  h ${Math.round(it.boxBounds.height)}\nisAutoWidth ${it.isAutoWidth}\nisAutoHeight ${it.isAutoHeight}`;
    });
  const words = ['auto', 'auto size', 'auto sized text'];
  let i = 0;
  const grow = (): void => {
    i = (i + 1) % words.length;
    (items[0] as Text).text = words[i];
    (items[1] as Text).text = ['width 70', 'a longer line that must wrap', 'wrap'][i];
    stage.after(80, refresh);
  };
  stage.after(80, refresh);
  stage.every(1400, grow);

  return stage.dispose;
};

export default mount;

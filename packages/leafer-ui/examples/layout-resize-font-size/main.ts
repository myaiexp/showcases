// Layout: resizeFontSize on an auto-sized Text
import { Leafer, Text } from 'leafer-ui';
import '@leafer-in/resize'; // the resize plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'resizeFontSize: true makes resizeWidth() scale the font; false sets the text box width and lets it wrap.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const base = stage.preview ? 22 : 36;
  const text = new Text({ x: 20, y: 20, text: 'Leafer', fontSize: base, fill: '#32cd79', fontWeight: 'bold' });
  leafer.add(text);
  const show = label(stage, '', true);
  let w = S;
  const redo = (): void => {
    text.set({ fontSize: base, width: undefined, height: undefined });
    text.resizeWidth(w);
    show(`resizeFontSize ${text.resizeFontSize}\nresizeWidth(${Math.round(w)})  ->  fontSize ${Math.round(text.fontSize!)}  width ${text.width ?? 'auto'}`);
  };
  toggle(stage, 'resizeFontSize', true, (v) => ((text.resizeFontSize = v), redo()), 2600);
  drive(stage, 'width', [S * 0.4, S * 1.6, 1], w, (v) => ((w = v), redo()), 5);

  return stage.dispose;
};

export default mount;

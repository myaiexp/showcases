// UI: export JSON and rebuild an element
import { Leafer, Rect, UI } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press clone from JSON after changing the colour.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.5;
  const rect = new Rect({ x: 30, y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill: '#32cd79', cornerRadius: 16, draggable: true });
  leafer.add(rect);
  const note = caption(stage, leafer);
  let copy: UI | undefined;
  const go = (): void => {
    rect.fill = ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'][Math.floor(Math.random() * 4)];
    const json = rect.toJSON();
    copy?.destroy();
    copy = UI.one({ ...json, x: stage.width - S - 30 }); // the tag in the JSON picks the class
    leafer.add(copy);
    note.text = rect.toString().slice(0, stage.preview ? 48 : 90);
  };
  go();
  if (stage.bar) button(stage.bar, 'clone from JSON', go);
  else stage.every(1500, go);

  return stage.dispose;
};

export default mount;

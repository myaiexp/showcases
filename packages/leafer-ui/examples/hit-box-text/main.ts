// Interaction: hitBox lets the padding around a Text take the pointer
import { Leafer, Text, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover inside the dashed box but away from the letters, then tick hitBox." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const fontSize = stage.preview ? 22 : 30;
  const pad = stage.preview ? 30 : 44;
  const text = new Text({ text: 'Hit', fontSize, fill: '#333', padding: pad, boxStyle: { stroke: '#999999', strokeWidth: 1, dashPattern: [4, 3] }, hitBox: false });
  text.set({ x: (stage.width - 2 * pad - fontSize * 1.6) / 2, y: (stage.height - 2 * pad - fontSize) / 2 - 10 });
  leafer.add(text);
  const say = label(stage, '', true);
  const show = (): void => say('hitBox = ' + text.hitBox + '\nhover: ' + (text.fill === '#FF4B4B' ? 'yes' : 'no'));
  text.on(PointerEvent.ENTER, () => ((text.fill = '#FF4B4B'), show()));
  text.on(PointerEvent.LEAVE, () => ((text.fill = '#333'), show()));
  const setBox = (on: boolean): void => {
    text.hitBox = on;
    show();
  };
  setBox(false);
  if (stage.bar) checkbox(stage.bar, 'hitBox', false, setBox);
  else {
    const ghost = stage.ghost(leafer);
    tour(stage, [false, true], async (on) => {
      ghost.leave();
      await stage.wait(500);
      setBox(on);
      await ghost.glide(text.x! + 8, text.y! + 8, 500); // the corner of the padding
      await stage.wait(1200);
      show();
    });
  }

  return stage.dispose;
};

export default mount;

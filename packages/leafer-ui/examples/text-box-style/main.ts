// Text: a background box and a hover style
import { Leafer, Text } from 'leafer-ui';
import '@leafer-in/state'; // hoverStyle
import '@leafer-in/animate'; // transitions between styles
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the text: the box turns red and rounder.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({
    ...mid(stage, 230, 50), fill: 'black', text: 'Welcome to LeaferJS', padding: 10, fontSize: stage.preview ? 16 : 20,
    boxStyle: { fill: '#32cd79', stroke: 'black', cornerRadius: 6 }, // the background box
    hoverStyle: { boxStyle: { fill: '#FF4B4B', cornerRadius: 20 } }, // restyle it on hover
  });
  leafer.add(text);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const { x, y, width, height } = text.getBounds();
      await ghost.glide(x! + width! / 2, y! + height! / 2, 500);
      await stage.wait(900);
      ghost.leave();
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;

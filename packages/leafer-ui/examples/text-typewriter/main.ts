// Text: a typewriter animation
import { Leafer, Text } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press replay.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  let text: Text | undefined;
  const run = (): void => {
    text?.destroy();
    text = new Text({ ...mid(stage, 220, 30), fill: '#32cd79', fontSize: 24, animation: { style: { text: 'Welcome to LeaferJS' }, duration: 2 } });
    leafer.add(text);
  };
  run();
  if (stage.bar) button(stage.bar, 'replay', run);
  else stage.every(3200, run);

  return stage.dispose;
};

export default mount;

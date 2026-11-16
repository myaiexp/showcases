// Fun: a button with hover and press styles and a transition
import { Leafer, Box } from 'leafer-ui';
import '@leafer-in/state'; // the interaction state plugin
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover and press the button.' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const box = new Box({
    x: stage.preview ? 85 : 100,
    y: stage.preview ? 80 : 100,
    fill: '#32cd79',
    cornerRadius: 5,
    origin: 'center', // scale from the middle
    button: true, // child Text follows the button's interaction state
    hoverStyle: {
      fill: '#FF4B4B',
      scale: 1.5,
      cornerRadius: 20,
    },
    pressStyle: {
      fill: '#FEB027',
      scale: 1.1,
      transitionOut: 'bounce-out', // how it leaves this state
    },
    children: [
      {
        tag: 'Text',
        text: 'Button',
        fontSize: 16,
        fontWeight: 'bold',
        padding: [10, 20],
        fill: 'rgba(0,0,0,0.5)',
        hoverStyle: { fill: 'black' },
      },
    ],
  });
  leafer.add(box);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const center = { x: 85 + 40, y: 80 + 17 };
    script(stage, async () => {
      ghost.leave();
      await stage.wait(600);
      await ghost.glide(center.x, center.y, 500); // hover
      await stage.wait(900);
      ghost.down(); // press
      await stage.wait(700);
      ghost.up();
      await stage.wait(900);
      ghost.leave();
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;

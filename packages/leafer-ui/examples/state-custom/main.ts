// Fun: custom states switched by click
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/state'; // the interaction state plugin
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the rect to switch its state.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(60),
    width: u(100),
    height: u(100),
    fill: '#32cd79',
    cornerRadius: 30,
    origin: 'center',
    states: {
      // custom state list
      color: { fill: '#FEB027' },
      rotate: { animation: { keyframes: [{ rotation: 45 }, { rotation: 135, scale: 1.2 }], duration: 1, swing: true } },
    },
    state: 'color', // the active state
    transition: 1,
  });
  leafer.add(rect);

  rect.on('click', () => {
    rect.state = rect.state === 'color' ? 'rotate' : 'color';
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.tap(u(150), u(110));
      await stage.wait(2200);
      await ghost.tap(u(150), u(110));
      await stage.wait(1800);
    });
  }

  return stage.dispose;
};

export default mount;

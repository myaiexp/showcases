// App & engine config: animating back into drag bounds
import { Leafer, Frame, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the square past the Frame\'s edge and let go.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { dragLimitAnimate: false }, // the default: limited live
      fill: '#333',
    }),
  );
  const frame = Frame.one({ fill: '#3d3d3d' }, u(50), u(30), u(170), u(150));
  leafer.add(frame);
  const rect = new Rect({ x: u(20), y: u(20), width: u(50), height: u(50), fill: GREEN, draggable: true, dragBounds: 'parent' }); // stay inside the frame
  frame.add(rect);
  const say = label(stage, '', true);
  const setAnimate = (on: boolean): void => {
    leafer.config.pointer!.dragLimitAnimate = on ? 0.3 : false;
    say(`dragLimitAnimate: ${on ? 0.3 : false}`);
  };

  if (stage.preview) {
    cycle(stage, [true, false], setAnimate, 5200);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(95), y: u(75) }, { x: u(250), y: u(60) }, 800);
      await stage.wait(1300);
      rect.set({ x: u(20), y: u(20) });
      await stage.wait(300);
    });
  } else checkbox(stage.bar!, 'dragLimitAnimate', false, setAnimate);

  return stage.dispose;
};

export default mount;

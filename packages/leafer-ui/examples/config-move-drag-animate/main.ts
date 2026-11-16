// App & engine config: inertia after a panning drag
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer, viewReadout } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Flick the canvas with the mouse, with dragAnimate off and on.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { drag: true, dragAnimate: false },
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  const setAnimate = (on: boolean): void => void (leafer.config.move!.dragAnimate = on);
  const say = label(stage, '');
  if (stage.preview) {
    cycle(stage, [false, true], (on) => (setAnimate(on), say(`dragAnimate: ${on}`)), 5200);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(60), y: u(160) }, { x: u(150), y: u(150) }, 160); // a quick flick
      await stage.wait(1600);
      leafer.set({ x: 0, y: 0 });
      await stage.wait(400);
    });
  } else checkbox(stage.bar!, 'dragAnimate', false, setAnimate);

  return stage.dispose;
};

export default mount;

// App & engine config: panning with a held key or mouse button
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer, viewReadout } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold space (or the middle or right button) and drag the background.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { holdSpaceKey: true, holdMiddleKey: true, holdRightKey: false }, // the defaults
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);
  const say = label(stage, '');

  if (stage.preview) {
    cycle(stage, [false, true], (on) => ((leafer.config.move!.holdRightKey = on), say(`holdRightKey: ${on}`)), 5200);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(60), y: u(170) }, { x: u(150), y: u(140) }, 600, { buttons: 2 }); // drag with the right button
      await stage.wait(900);
      leafer.set({ x: 0, y: 0 });
      await stage.wait(400);
    });
  } else {
    checkbox(stage.bar!, 'holdSpaceKey', true, (on) => (leafer.config.move!.holdSpaceKey = on));
    checkbox(stage.bar!, 'holdMiddleKey', true, (on) => (leafer.config.move!.holdMiddleKey = on));
    checkbox(stage.bar!, 'holdRightKey', false, (on) => (leafer.config.move!.holdRightKey = on));
  }

  return stage.dispose;
};

export default mount;

// App & engine config: panning by dragging empty space
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer, viewReadout } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the background, then a square.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { dragEmpty: false }, // the default
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);
  const say = label(stage, '');

  const setEmpty = (on: boolean): void => void (leafer.config.move!.dragEmpty = on);
  if (stage.preview) {
    cycle(stage, [false, true], (on) => (setEmpty(on), say(`dragEmpty: ${on}`)), 4600);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(40), y: u(180) }, { x: u(90), y: u(150) }, 600); // empty space
      await stage.wait(700);
      leafer.set({ x: 0, y: 0 });
      await stage.wait(400);
    });
  } else checkbox(stage.bar!, 'dragEmpty', false, setEmpty);

  return stage.dispose;
};

export default mount;

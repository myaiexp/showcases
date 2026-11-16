// App & engine config: dragging to pan the view
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer, viewReadout } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a square and the background in each mode.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { drag: false }, // the default: only the wheel pans
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

    const setDrag = (m: string): void => void (leafer.config.move!.drag = m === 'auto' ? 'auto' : m === 'true');
    const say = label(stage, '');

  const modes = ['false', 'true', 'auto'];
  if (stage.preview) {
    cycle(stage, modes, (m) => (setDrag(m), say(`move.drag: ${m}`)), 4800);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(130), y: u(90) }, { x: u(150), y: u(110) }, 500); // on a square
      await stage.wait(300);
      await ghost.drag({ x: u(40), y: u(180) }, { x: u(70), y: u(160) }, 500); // on empty space
      await stage.wait(700);
    });
  } else select(stage.bar!, 'move.drag', modes, setDrag, 'false');

  return stage.dispose;
};

export default mount;

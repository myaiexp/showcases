// App & engine config: rounding drag positions
import { Leafer, Rect, DragEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, dragToAndFro, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the rect with pointSnap off, then on; the view is at scale 1.37.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      pointSnap: false,
      fill: '#333',
    }),
  );
  leafer.scale = 1.37; // a fractional zoom makes drags fractional
  const rect = new Rect({ x: u(60), y: u(60), width: u(80), height: u(80), fill: GREEN, draggable: true });
  leafer.add(rect);
  const say = label(stage, '', true);
  leafer.on(DragEvent.DRAG, () => say(`pointSnap ${leafer.config.pointSnap}   rect x ${rect.x}, y ${rect.y}`));
  const setSnap = (on: boolean): void => void (leafer.config.pointSnap = on);

  if (stage.preview) {
    cycle(stage, [false, true], setSnap, 3600);
    dragToAndFro(stage, leafer, { x: u(110), y: u(80) }, { x: u(190) + 0.4, y: u(120) + 0.3 });
  } else checkbox(stage.bar!, 'pointSnap', false, setSnap);

  return stage.dispose;
};

export default mount;

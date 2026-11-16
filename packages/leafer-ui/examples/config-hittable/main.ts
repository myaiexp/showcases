// App & engine config: switching interaction events off
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, dragToAndFro, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle hittable and try to drag the square.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      hittable: true, // the default
      fill: '#333',
    }),
  );
  const rect = Rect.one({ fill: GREEN, draggable: true }, u(80), u(60), u(100), u(100));
  leafer.add(rect);
  const say = label(stage, '', true);
  const setHit = (on: boolean): void => {
    leafer.hittable = on;
    say(`hittable: ${on}`);
  };

  if (stage.preview) {
    cycle(stage, [true, false], setHit, 3400);
    dragToAndFro(stage, leafer, { x: u(130), y: u(110) }, { x: u(190), y: u(140) });
  } else checkbox(stage.bar!, 'hittable', true, setHit);

  return stage.dispose;
};

export default mount;

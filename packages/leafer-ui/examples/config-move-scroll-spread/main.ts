// App & engine config: widening the scroll limits
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan past the edge with the wheel; raise scrollSpread to allow more.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { scroll: 'limit', scrollSpread: 0 },
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  const setSpread = (n: number): void => void (leafer.config.move!.scrollSpread = n);
  if (stage.preview) {
    cycle(stage, [0, 90], setSpread, 5600);
    wheelTour(stage, leafer, { zoom: false, diagonal: true, panSteps: 10, panDelta: 40, hold: 300 });
  } else slider(stage.bar!, 'scrollSpread', 0, 200, 5, 0, setSpread);

  return stage.dispose;
};

export default mount;

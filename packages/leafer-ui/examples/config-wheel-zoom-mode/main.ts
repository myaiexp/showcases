// App & engine config: zooming straight from the wheel
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a zoomMode and turn the wheel without ctrl.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      wheel: { zoomMode: true }, // the wheel zooms directly
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

    const setMode = (m: boolean | 'mouse'): void => void (leafer.config.wheel!.zoomMode = m);

  if (stage.preview) {
    cycle(stage, ['mouse', false] as const, setMode, 5200);
    wheelTour(stage, leafer, { ctrl: false, hold: 300 });
  } else select(stage.bar!, 'zoomMode', ['false', 'true', 'mouse'], (m) => setMode(m === 'mouse' ? 'mouse' : m === 'true'), 'true');

  return stage.dispose;
};

export default mount;

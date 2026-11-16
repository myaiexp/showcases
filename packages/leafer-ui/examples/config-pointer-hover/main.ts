// App & engine config: turning hover events off
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycle, hoverLoop, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle hover and move over the rect.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { hover: true }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(80), y: u(70), width: u(100), height: u(60), fill: '#32cd79' });
  leafer.add(rect);
  rect.on(PointerEvent.ENTER, () => (rect.fill = '#8cf0b4'));
  rect.on(PointerEvent.LEAVE, () => (rect.fill = '#32cd79'));

    const say = label(stage, '', true);
    const setHover = (on: boolean): void => {
      leafer.config.pointer!.hover = on;
      say(`pointer.hover: ${on}`);
    };

  if (stage.preview) {
    cycle(stage, [true, false], setHover, 4200);
    hoverLoop(stage, leafer, { x: u(130), y: u(100) }, 1000);
  } else checkbox(stage.bar!, 'hover', true, setHover);

  return stage.dispose;
};

export default mount;

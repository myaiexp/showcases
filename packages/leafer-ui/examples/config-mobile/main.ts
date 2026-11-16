// App & engine config: the mobile switch and its effect on hover
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycle, hoverLoop, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle mobile and hover the rect.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      mobile: false, // true: hover events are disabled
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(70), y: u(60), width: u(130), height: u(90), fill: '#32cd79' });
  leafer.add(rect);
  rect.on(PointerEvent.ENTER, () => (rect.fill = '#8cf0b4'));
  rect.on(PointerEvent.LEAVE, () => (rect.fill = '#32cd79'));
  const say = label(stage, '', true);
  const setMobile = (on: boolean): void => {
    leafer.config.mobile = on; // takes effect while running
    say(`mobile: ${on}`);
  };

  if (stage.preview) {
    cycle(stage, [false, true], setMobile, 4200);
    hoverLoop(stage, leafer, { x: u(130), y: u(105) }, 1000);
  } else checkbox(stage.bar!, 'mobile', false, setMobile);

  return stage.dispose;
};

export default mount;

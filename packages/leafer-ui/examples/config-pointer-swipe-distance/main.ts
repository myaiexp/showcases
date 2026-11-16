// App & engine config: the swipe threshold
import { Leafer, Rect, SwipeEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Flick the pointer sideways over the rect; raise swipeDistance.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { swipeDistance: 20 }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(50), y: u(70), width: u(160), height: u(70), fill: GREEN });
  leafer.add(rect);
  let swipes = 0;
  const say = label(stage, '', true);
  const show = (): void => say(`swipeDistance ${leafer.config.pointer!.swipeDistance} px   swipe.right: ${swipes}`);
  rect.on(SwipeEvent.RIGHT, () => (swipes++, (rect.fill = '#FEB027'), show()));
  const setDistance = (v: number): void => {
    leafer.config.pointer!.swipeDistance = v;
    swipes = 0;
    rect.fill = GREEN;
    show();
  };

  if (stage.preview) {
    cycle(stage, [20, 120], setDistance, 4400);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(70), y: u(105) }, { x: u(70) + 60, y: u(105) }, 120); // a quick 60 px flick
      await stage.wait(1200);
      rect.fill = GREEN;
    });
  } else slider(stage.bar!, 'swipeDistance (px)', 5, 300, 5, 20, setDistance);

  return stage.dispose;
};

export default mount;

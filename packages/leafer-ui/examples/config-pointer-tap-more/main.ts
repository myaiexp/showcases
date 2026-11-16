// App & engine config: firing tap, double_tap and long_tap together
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Double-click the rect with tapMore off and on.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { tapMore: false }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(80), y: u(60), width: u(110), height: u(90), fill: GREEN });
  leafer.add(rect);
  const count = { tap: 0, double_tap: 0 };
  const say = label(stage, '', true);
  const show = (): void => say(`tapMore ${leafer.config.pointer!.tapMore}   tap ${count.tap}   double_tap ${count.double_tap}`);
  rect.on(PointerEvent.TAP, () => (count.tap++, show()));
  rect.on(PointerEvent.DOUBLE_TAP, () => (count.double_tap++, show()));
  const setMore = (on: boolean): void => {
    leafer.config.pointer!.tapMore = on;
    count.tap = count.double_tap = 0;
    show();
  };

  if (stage.preview) {
    cycle(stage, [false, true], setMore, 4200);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.doubleTap(u(130), u(105));
      await stage.wait(1500);
    });
  } else checkbox(stage.bar!, 'tapMore', false, setMore);

  return stage.dispose;
};

export default mount;

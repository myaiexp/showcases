// App & engine config: the double-tap time window
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Double-click quickly and slowly; shrink tapTime to make double taps harder.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { tapTime: 120 }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(80), y: u(60), width: u(110), height: u(90), fill: GREEN });
  leafer.add(rect);
  const count = { tap: 0, double_tap: 0 };
  const say = label(stage, '', true);
  const show = (): void => say(`tapTime ${leafer.config.pointer!.tapTime} ms   tap ${count.tap}   double_tap ${count.double_tap}`);
  rect.on(PointerEvent.TAP, () => (count.tap++, show()));
  rect.on(PointerEvent.DOUBLE_TAP, () => (count.double_tap++, rect.set({ fill: '#FEB027' }), show()));
  const setTime = (v: number): void => {
    leafer.config.pointer!.tapTime = v;
    rect.fill = GREEN;
    count.tap = count.double_tap = 0;
    show();
  };

  if (stage.preview) {
    cycle(stage, [120, 10], setTime, 4000);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.doubleTap(u(130), u(105)); // two taps about 90 ms apart
      await stage.wait(1300);
      rect.fill = GREEN;
    });
  } else slider(stage.bar!, 'tapTime (ms)', 10, 400, 10, 120, setTime);

  return stage.dispose;
};

export default mount;

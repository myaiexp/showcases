// App & engine config: the long-press threshold
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press and hold the rect; lower longPressTime to trigger sooner.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { longPressTime: 800 }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(80), y: u(60), width: u(110), height: u(90), fill: GREEN });
  leafer.add(rect);
  let presses = 0;
  const say = label(stage, '', true);
  const show = (): void => say(`longPressTime ${leafer.config.pointer!.longPressTime} ms   long_press: ${presses}`);
  rect.on(PointerEvent.LONG_PRESS, () => (presses++, (rect.fill = '#FEB027'), show()));
  rect.on(PointerEvent.UP, () => (rect.fill = GREEN));
  const setTime = (v: number): void => {
    leafer.config.pointer!.longPressTime = v;
    presses = 0;
    show();
  };

  if (stage.preview) {
    cycle(stage, [800, 300], setTime, 4600);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.glide(u(130), u(105), 400);
      ghost.down();
      await stage.wait(600); // held for 600 ms
      ghost.up();
      await stage.wait(1400);
    });
  } else slider(stage.bar!, 'longPressTime (ms)', 100, 1500, 50, 800, setTime);

  return stage.dispose;
};

export default mount;

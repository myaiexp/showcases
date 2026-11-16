// Animate: reading the running animation back, and two ways to end it
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'killAnimate() ends the slide: the rect jumps to the end. animate().kill(false) stops it where it stands.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 56 : 80;
  const rect = new Rect({ x: 20, y: (stage.height - s) / 2, width: s, height: s, cornerRadius: 12, fill: GREEN });
  leafer.add(rect);
  const to = stage.width - s - 20;

  const start = (): void => {
    rect.killAnimate();
    rect.x = 20;
    rect.animate({ x: to }, { duration: 3, easing: 'linear' });
  };
  const say = label(stage, '', true);
  stage.loop(() => {
    const a = rect.animate(); // no argument: the current animation
    say(`rect.animate() -> ${a && a.running ? `running, ${(a.time ?? 0).toFixed(1)} s` : 'none running'}`);
  });

  const freeze = (): void => rect.animate()?.kill(false); // keep the current values
  if (stage.bar) {
    button(stage.bar, 'animate(...)', start);
    button(stage.bar, 'killAnimate()', () => rect.killAnimate());
    button(stage.bar, 'animate().kill(false)', freeze);
    start();
  } else {
    script(stage, async () => {
      start();
      await stage.wait(1300);
      freeze();
      await stage.wait(1200);
      start();
      await stage.wait(1300);
      rect.killAnimate();
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;

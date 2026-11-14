// VFX-JS example: t.running while a run plays, t.cancel() ending it early
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { DEFAULT_SLIDES } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx);
  const t = vfx.addTransition(box, { transition: Swipe, duration: 2.4 });

  let i = 0;
  const go = (): void => {
    i = (i + 1) % DEFAULT_SLIDES.length;
    void t.show(i);
  };
  let last = '';
  stage.frame(() => {
    const now = `t.running: ${t.running}`;
    if (now !== last) {
      last = now;
      stage.say(`${now} (slide: ${DEFAULT_SLIDES[i]!.title})`);
    }
  });

  if (stage.bar) {
    button(stage.bar, 'show next (2.4 s)', go);
    button(stage.bar, 't.cancel()', () => t.cancel());
  } else {
    stage.play(async (wait) => {
      go();
      await wait(1000);
      t.cancel();
      await wait(1200);
      go();
      await wait(3200);
    });
  }
  return () => stage.dispose();
};

export default mount;

// VFX-JS example: three quick run() calls; dropped runs still apply their DOM
import { Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PICTURE_KINDS } from '../../shared/pictures.ts';
import { slide } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx, { slides: [] });
  const make = (n: number): HTMLElement => slide({ kind: PICTURE_KINDS[n % PICTURE_KINDS.length]!, title: `Run ${n}` });
  let n = 0;
  box.append(make(0));
  const t = vfx.addTransition(box, { transition: Swipe, duration: 1.2 });

  let busy = false;
  const burst = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    const log: string[] = [];
    const show = (): void => stage.say(log.join('; '));
    const start = performance.now();
    const ms = (): string => `${Math.round(performance.now() - start)} ms`;
    const runs: Promise<void>[] = [];
    for (let k = 0; k < 3; k++) {
      n++;
      const id = n;
      runs.push(
        t
          .run(() => {
            box.replaceChildren(make(id));
            log.push(`cb ${id} ran`);
            show();
          })
          .then(() => {
            log.push(`run ${id} resolved at ${ms()}`);
            show();
          }),
      );
      if (k < 2) await stage.wait(250);
    }
    await Promise.all(runs);
    log.push(`box shows "${box.querySelector('h3')!.textContent}"`);
    show();
    busy = false;
  };

  const go = (): void => void burst().catch(() => undefined);
  if (stage.bar) button(stage.bar, 'three runs, 250 ms apart', go);
  else stage.play(async (wait) => {
    go();
    await wait(4200);
  });
  stage.say('run() x 3: the older ones are dropped');
  return () => stage.dispose();
};

export default mount;

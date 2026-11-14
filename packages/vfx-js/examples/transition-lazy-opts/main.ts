// VFX-JS example: run(cb, () => opts) picks the transition from the new content
import { Crossfade, Glitch } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PICTURE_KINDS } from '../../shared/pictures.ts';
import { slide } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx, { slides: [] });
  const moods = ['calm', 'wild', 'calm', 'wild'] as const;
  const make = (n: number): HTMLElement => {
    const s = slide({ kind: PICTURE_KINDS[n % PICTURE_KINDS.length]!, title: `${moods[n % moods.length]}` });
    s.dataset['mood'] = moods[n % moods.length]!;
    return s;
  };
  let n = 0;
  box.append(make(0));
  const t = vfx.addTransition(box, { transition: Crossfade, duration: 0.9 });

  const next = (): void => {
    n++;
    const log: string[] = [];
    void t.run(
      () => {
        box.replaceChildren(make(n));
        log.push('cb: new slide in the DOM');
      },
      // Called once, after cb: the new content is in the box and can be read.
      () => {
        const mood = (box.firstElementChild as HTMLElement).dataset['mood'];
        log.push(`opts(): mood is "${mood}", so ${mood === 'wild' ? 'Glitch' : 'Crossfade'}`);
        stage.say(log.join(' -> '));
        return mood === 'wild' ? { transition: Glitch } : {};
      },
    );
  };
  if (stage.bar) button(stage.bar, 'run(cb, () => opts)', next);
  else stage.every(2400, next);
  stage.say('run(cb, () => opts): opts is read after cb');
  return () => stage.dispose();
};

export default mount;

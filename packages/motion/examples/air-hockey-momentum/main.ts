// A puck you flick around a rink: drag momentum tuned with transition { power, timeConstant, bounce* }
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="rink${preview ? '' : ' big'}"><i class="mid"></i><div class="puck"></div></div>`;
  const rink = el.querySelector<HTMLElement>('.rink')!;
  const puck = el.querySelector<HTMLElement>('.puck')!;

  const opts = { momentum: true, power: 0.8, timeConstant: 700, bounceStiffness: 500, bounceDamping: 12 };
  let stop: VoidFunction = () => undefined;
  const arm = (): void => {
    stop();
    // Inertia reads the release velocity; hitting the rink wall bounces with bounceStiffness / bounceDamping.
    stop = drag(puck, {
      constraints: rink,
      elastic: 0,
      momentum: opts.momentum,
      transition: { power: opts.power, timeConstant: opts.timeConstant, bounceStiffness: opts.bounceStiffness, bounceDamping: opts.bounceDamping },
    });
  };
  const scope = scopeMotion(el, arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Flick the puck and let go while still moving. Turn momentum off and it stops dead where you release. Walls bounce it back.');
    p = panel(el);
    const set = (k: keyof typeof opts) => (v: number | boolean) => {
      (opts as Record<string, number | boolean>)[k] = v;
      scope.run(arm);
    };
    p.toggle('momentum', true, set('momentum'));
    p.slider('power', { min: 0.2, max: 1.5, step: 0.1, value: 0.8 }, set('power'));
    p.slider('timeConstant', { min: 100, max: 1500, step: 50, value: 700 }, set('timeConstant'));
    p.slider('bounceStiffness', { min: 100, max: 1000, step: 50, value: 500 }, set('bounceStiffness'));
    p.slider('bounceDamping', { min: 5, max: 60, step: 1, value: 12 }, set('bounceDamping'));
    p.button('Centre puck', () => scope.run(() => animate(puck, { x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.4 })));
  } else {
    let i = 0;
    const dirs = [[60, -25], [-90, 30], [30, 50]] as const;
    loopGesture(el, signal, async (g) => {
      const [dx, dy] = dirs[i++ % dirs.length]!;
      const from = at(el, puck);
      await g.flick(puck, from, { x: from.x + dx, y: from.y + dy }, 0.22);
      await g.wait(2.0);
      await scope.run(() => animate(puck, { x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.4 }));
    }, 0.2);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

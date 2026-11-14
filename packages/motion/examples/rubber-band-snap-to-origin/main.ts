// A stretchy pull tab: snapToOrigin true, "x" or "y" decides which axis springs home on release
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

type Snap = 'both' | 'x only' | 'y only';
const VALUES = { both: true, 'x only': 'x', 'y only': 'y' } as const;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="pad${preview ? '' : ' big'}">
      <svg><line class="band" /></svg>
      <div class="knob">PULL</div>
    </div>`;
  const pad = el.querySelector<HTMLElement>('.pad')!;
  const knob = el.querySelector<HTMLElement>('.knob')!;
  const band = el.querySelector<SVGLineElement>('.band')!;

  // The rubber band is a line from the pad's centre to the knob's current centre.
  let raf = 0;
  const draw = (): void => {
    const a = pad.getBoundingClientRect();
    const b = knob.getBoundingClientRect();
    band.setAttribute('x1', String(a.width / 2));
    band.setAttribute('y1', String(a.height / 2));
    band.setAttribute('x2', String(b.left - a.left + b.width / 2));
    band.setAttribute('y2', String(b.top - a.top + b.height / 2));
    raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);

  let stop: VoidFunction = () => undefined;
  const arm = (mode: Snap): void => {
    stop();
    stop = drag(knob, { snapToOrigin: VALUES[mode], transition: { bounceStiffness: 500, bounceDamping: 12 } });
  };
  const scope = scopeMotion(el, () => arm('both'));

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Pull the knob and let go. With "x only" it springs back sideways but stays where you left it vertically.');
    p = panel(el);
    p.select('snapToOrigin', ['both', 'x only', 'y only'] as const, 'both', (v) => {
      scope.run(() => {
        arm(v);
        animate(knob, { x: 0, y: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.3 });
      });
    });
  } else {
    let i = 0;
    const pulls = [[70, -40], [-60, 45], [20, 60]] as const;
    loopGesture(el, signal, async (g) => {
      const [dx, dy] = pulls[i++ % pulls.length]!;
      const from = at(el, knob);
      await g.drag(knob, from, { x: from.x + dx, y: from.y + dy }, 0.5);
      await g.wait(1.0);
    }, 0.3);
  }

  return () => {
    cancelAnimationFrame(raf);
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

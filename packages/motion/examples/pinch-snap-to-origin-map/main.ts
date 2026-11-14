// A map you zoom and rotate with two fingers that springs home on release: snapToOrigin and a transition override
import { animate, pinch, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const FEELS = {
  gentle: { bounce: 0, visualDuration: 0.7 },
  bouncy: { bounce: 0.5, visualDuration: 0.6 },
  snappy: { bounce: 0.15, visualDuration: 0.25 },
} as const;
type Feel = keyof typeof FEELS;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="frame${preview ? '' : ' big'}">
      <div class="map"><i class="road r1"></i><i class="road r2"></i><i class="road r3"></i><b class="pin p1"></b><b class="pin p2"></b><b class="pin p3"></b></div>
      <span class="badge">pinch me</span>
    </div>`;
  const frame = el.querySelector<HTMLElement>('.frame')!;
  const map = el.querySelector<HTMLElement>('.map')!;
  let snap = true;
  let feel: Feel = 'bouncy';
  let stop: VoidFunction = () => undefined;
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    stop();
    stop = pinch(map, { snapToOrigin: snap, transition: FEELS[feel] });
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Pinch, twist and pan the map with two fingers (desktop: Ctrl + scroll zooms). Let go and it springs back to its start. Change the spring, or turn snapToOrigin off to leave it where you put it.');
    p = panel(el);
    p.toggle('snapToOrigin', true, (v) => {
      snap = v;
      scope.run(arm);
    });
    p.select('spring', ['gentle', 'bouncy', 'snappy'] as const, 'bouncy', (v) => {
      feel = v;
      scope.run(arm);
    });
    p.button('Reset', () => scope.run(() => animate(map, { scale: 1, rotate: 0, x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.4 })));
  } else {
    loopGesture(el, signal, async (g) => {
      const r = frame.getBoundingClientRect();
      const f = el.getBoundingClientRect();
      const c = { x: r.left - f.left + r.width * 0.45, y: r.top - f.top + r.height * 0.5 };
      await g.pinch(map, c, { fromGap: 40, toGap: 100, fromAngle: 0, toAngle: 40 }, 0.9);
      await g.wait(1.0);
    }, 0.3);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

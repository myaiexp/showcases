// Straighten a photo: two-finger rotation that snaps to the nearest multiple of a chosen angle on release
import { animate, pinch, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="stage${preview ? '' : ' big'}"><div class="print"><div class="pic"><b>UP</b></div><span>Holiday 2026</span></div></div>`;
  const stage = el.querySelector<HTMLElement>('.stage')!;
  const print = el.querySelector<HTMLElement>('.print')!;

  let snap = 90;
  let stop: VoidFunction = () => undefined;
  let readout: ((v: string) => void) | undefined;
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    stop();
    // rotate.snap: on release the angle springs to the nearest multiple. scale and pan are off: rotation only.
    stop = pinch(
      print,
      () => ({
        onPinch: (_e, info) => readout?.(`${Math.round(info.rotate)} deg`),
        onComplete: () => readout?.(`snapped to a multiple of ${snap}`),
      }),
      { scale: false, pan: false, rotate: { snap }, transition: { bounce: 0.3, visualDuration: 0.4 } },
    );
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Twist with two fingers (a trackpad rotate also works) and let go: the print turns to the nearest snap angle.');
    p = panel(el);
    readout = p.readout('rotation');
    p.select('snap', ['15', '45', '90'] as const, '90', (v) => {
      snap = Number(v);
      scope.run(arm);
    });
    p.button('Reset', () => scope.run(() => animate(print, { rotate: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.4 })));
  } else {
    let turn = 70;
    loopGesture(el, signal, async (g) => {
      const r = stage.getBoundingClientRect();
      const f = el.getBoundingClientRect();
      const c = { x: r.left - f.left + r.width / 2, y: r.top - f.top + r.height / 2 };
      await g.pinch(print, c, { fromGap: 90, toGap: 90, fromAngle: 0, toAngle: turn }, 0.8);
      await g.wait(1.2);
      turn = turn === 70 ? -50 : 70;
    }, 0.2);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

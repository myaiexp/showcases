// "Hold to delete": press() with a hold time, onHold progress filling a ring, early release cancels
import { animate, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const C = 2 * Math.PI * 26;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="file${preview ? '' : ' big'}">
      <div class="thumb"></div>
      <div class="meta"><b>beach-sunset.jpg</b><span class="msg">Hold the bin to delete</span></div>
      <button class="bin" type="button" aria-label="Hold to delete">
        <svg viewBox="0 0 60 60"><circle class="track" cx="30" cy="30" r="26" /><circle class="ring" cx="30" cy="30" r="26" /></svg>
        <i>&#x1F5D1;</i>
      </button>
    </div>`;
  const file = el.querySelector<HTMLElement>('.file')!;
  const bin = el.querySelector<HTMLElement>('.bin')!;
  const ring = el.querySelector<SVGCircleElement>('.ring')!;
  const msg = el.querySelector<HTMLElement>('.msg')!;
  ring.style.strokeDasharray = String(C);
  const setRing = (k: number): void => {
    ring.style.strokeDashoffset = String(C * (1 - k));
  };
  setRing(0);
  let holdTime = 1;

  let stop: VoidFunction = () => undefined;
  let k = 0;
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    stop();
    // hold is documented in the d.ts (PressOptions), next to press.md: the press only succeeds once held that long.
    stop = press(
      bin,
      () => {
        animate(bin, { scale: 0.92 }, { duration: 0.15 });
        msg.textContent = 'Keep holding...';
        return {
          onHold: (progress) => setRing((k = progress)),
          onComplete: scope.bind(async (_e, info) => {
            animate(bin, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
            if (!info.success) {
              msg.textContent = 'Let go too early: cancelled';
              animate(k, 0, { duration: 0.25, onUpdate: setRing });
              return;
            }
            msg.textContent = 'Deleted';
            await animate(file, { opacity: 0, x: 40 }, { duration: 0.35 });
            setRing(0);
            await animate(file, { opacity: 1, x: 0 }, { duration: 0.35, delay: 1 });
            msg.textContent = 'Hold the bin to delete';
          }),
        };
      },
      { hold: holdTime },
    );
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Press and hold the bin until the ring closes. Release early and the delete is cancelled.');
    p = panel(el);
    p.slider('hold (s)', { min: 0.3, max: 2.5, step: 0.1, value: 1 }, (v) => {
      holdTime = v;
      scope.run(arm);
    });
  } else {
    holdTime = 0.8;
    scope.run(arm);
    let full = false;
    loopGesture(el, signal, async (g) => {
      const a = at(el, bin);
      full = !full;
      await g.tap(bin, a, full ? 1.1 : 0.4);
      await g.wait(full ? 2.4 : 1.0);
    }, 0.2);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

// A quantity stepper: hold the + or - and, after a short hold, it keeps counting through onRepeat
import { animate, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="cart${preview ? '' : ' big'}">
      <span class="item">Coffee beans, 250 g</span>
      <div class="stepper"><button class="minus" type="button" aria-label="Fewer">&minus;</button><output class="qty">1</output><button class="plus" type="button" aria-label="More">+</button></div>
    </div>`;
  const qty = el.querySelector<HTMLElement>('.qty')!;
  const minus = el.querySelector<HTMLElement>('.minus')!;
  const plus = el.querySelector<HTMLElement>('.plus')!;
  let n = 1;
  let holdFor = 0.4;
  let every = 0.1;

  const bump = (by: number): void => {
    n = Math.max(0, Math.min(99, n + by));
    qty.textContent = String(n);
    animate(qty, { scale: [1.25, 1] }, { duration: 0.15 });
  };

  let stops: VoidFunction[] = [];
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    for (const s of stops) s();
    // hold and repeat are documented in the d.ts (PressOptions), next to press.md.
    // A press counts once on press start; after `hold` seconds, onRepeat fires every `repeat` seconds.
    stops = [[plus, 1], [minus, -1]].map(([button, by]) =>
      press(
        button as HTMLElement,
        (b) => {
          bump(by as number);
          animate(b, { scale: 0.88 }, { duration: 0.1 });
          return {
            onRepeat: () => bump(by as number),
            onComplete: () => animate(b, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.25 }),
          };
        },
        { hold: holdFor, repeat: every },
      ),
    );
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Click for one step. Press and hold: after the hold time it counts on by itself until you let go.');
    p = panel(el);
    p.slider('hold (s)', { min: 0.1, max: 1.5, step: 0.05, value: 0.4 }, (v) => {
      holdFor = v;
      scope.run(arm);
    });
    p.slider('repeat (s)', { min: 0.03, max: 0.5, step: 0.01, value: 0.1 }, (v) => {
      every = v;
      scope.run(arm);
    });
  } else {
    let up = true;
    loopGesture(el, signal, async (g) => {
      const b = up ? plus : minus;
      await g.tap(b, at(el, b), 1.4);
      up = !up;
      await g.wait(0.8);
    }, 0.2);
  }

  return () => {
    for (const s of stops) s();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

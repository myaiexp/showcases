// Tooltips on touch: hover() ignores the hover browsers fake after a tap, a raw pointerenter listener does not
import { animate, hover, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type Kind = 'mouse' | 'touch';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="pair${preview ? '' : ' big'}">
      <div class="col"><h4>hover()</h4><button class="info" data-k="lib" type="button">i</button><div class="tip" data-k="lib">Free shipping over 50 EUR</div></div>
      <div class="col"><h4>raw pointerenter</h4><button class="info" data-k="raw" type="button">i</button><div class="tip" data-k="raw">Free shipping over 50 EUR</div></div>
    </div>
    <p class="note">Send an input below</p>`;
  const note = el.querySelector<HTMLElement>('.note')!;
  const q = (k: string, c: string): HTMLElement => el.querySelector<HTMLElement>(`${c}[data-k="${k}"]`)!;
  const [libBtn, rawBtn] = [q('lib', '.info'), q('raw', '.info')];
  const tip = (k: string, on: boolean): void => {
    animate(q(k, '.tip'), { opacity: on ? 1 : 0, y: on ? 0 : 6 }, { duration: 0.2 });
  };
  let cancelHover: VoidFunction | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    animate('.tip', { opacity: 0 }, { duration: 0 });
    // hover() drops the pointerenter that touch browsers emulate, so this tooltip never sticks.
    cancelHover = hover(libBtn, () => {
      tip('lib', true);
      return () => tip('lib', false);
    });
    rawBtn.addEventListener('pointerenter', bind(() => tip('raw', true)));
    rawBtn.addEventListener('pointerleave', bind(() => tip('raw', false)));
  });

  const send = (type: string, kind: Kind, to: Element[]): void => {
    for (const t of to) t.dispatchEvent(new PointerEvent(type, { pointerType: kind, pointerId: 1, isPrimary: true, bubbles: false }));
  };
  const both = [libBtn, rawBtn];
  const mouseIn = (): void => { send('pointerenter', 'mouse', both); note.textContent = 'Mouse enters both: both tooltips open'; };
  const mouseOut = (): void => { send('pointerleave', 'mouse', both); note.textContent = 'Mouse leaves: both close'; };
  const touchTap = (): void => { send('pointerenter', 'touch', both); note.textContent = 'Touch tap: only the raw tooltip opened, and it stays'; };
  const tapAway = (): void => { send('pointerleave', 'touch', both); note.textContent = 'Tap elsewhere: the stuck tooltip finally closes'; };

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Phones fire a pointerenter after a tap and no leave until you tap elsewhere. The panel replays both inputs; hover() ignores the touch one. Real mouse hover works on both icons too.');
    p = panel(el);
    p.button('Mouse in', scope.bind(mouseIn));
    p.button('Mouse out', scope.bind(mouseOut));
    p.button('Touch tap', scope.bind(touchTap));
    p.button('Tap elsewhere', scope.bind(tapAway));
  } else {
    loopGesture(el, signal, async (g) => {
      const run = (fn: () => void): void => scope.run(fn);
      run(mouseIn);
      await g.wait(1);
      run(mouseOut);
      await g.wait(0.7);
      run(touchTap);
      await g.wait(1.2);
      run(tapAway);
      await g.wait(0.8);
    }, 0.1);
  }

  return () => {
    cancelHover?.();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

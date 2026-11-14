// A draggable panel holding draggable chips: the innermost wins, unless propagation lets the parent move too
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="desk${preview ? '' : ' big'}">
      <div class="card"><b>Weekend plans</b><span class="chip">Hike</span><span class="chip">Sauna</span><span class="chip">Movie</span></div>
    </div>
    <p class="moved">Drag a chip or the card</p>`;
  const desk = el.querySelector<HTMLElement>('.desk')!;
  const card = el.querySelector<HTMLElement>('.card')!;
  const moved = el.querySelector<HTMLElement>('.moved')!;
  const chips = [...el.querySelectorAll<HTMLElement>('.chip')];
  let propagate = false;
  let lastStart = 0;
  let who = new Set<string>();
  const report = (name: string): void => {
    // Both onStart callbacks fire in the same gesture, so collect names for a moment.
    const now = performance.now();
    if (now - lastStart > 50) who = new Set();
    lastStart = now;
    who.add(name);
    moved.textContent = `moving: ${[...who].join(' + ')}`;
  };

  let stops: VoidFunction[] = [];
  const arm = (): void => {
    for (const s of stops) s();
    stops = [
      // The chips are the inner draggables; the card is their draggable parent.
      ...chips.map((c) => drag(c, { constraints: card, elastic: 0.3, onStart: () => report('chip') })),
      drag(card, { constraints: desk, elastic: 0.2, propagation: propagate, onStart: () => report('card') }),
    ];
  };
  const scope = scopeMotion(el, arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Drag a chip: by default only the chip moves. Switch propagation on and the card moves along with it.');
    p = panel(el);
    p.toggle('propagation on the card', false, (v) => {
      propagate = v;
      scope.run(() => {
        arm();
        animate([...chips, card], { x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.3 });
      });
    });
  } else {
    loopGesture(el, signal, async (g) => {
      const chip = chips[0]!;
      const a = at(el, chip);
      await g.drag(chip, a, { x: a.x + 40, y: a.y + 30 }, 0.5);
      await g.wait(0.4);
      const b = at(el, card, 0.8, 0.2);
      await g.drag(card, b, { x: b.x - 25, y: b.y - 20 }, 0.5);
      await g.wait(0.6);
      await scope.run(() => animate([...chips, card], { x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.4 }));
    }, 0.3);
  }

  return () => {
    for (const s of stops) s();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;

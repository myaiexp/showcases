// VFX-JS example: ease as smoothstep, linear, or a function
import { Swipe } from '@vfx-js/transitions';
import type { TransitionEase } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const EASES: readonly (readonly [TransitionEase, string])[] = [
  ['smoothstep', "'smoothstep' (default)"],
  ['linear', "'linear'"],
  [(x) => x * x * x, '(x) => x ** 3: slow start'],
  [(x) => 1 - (1 - x) ** 3, '(x) => 1 - (1 - x) ** 3: slow end'],
  [(x) => Math.floor(x * 5) / 5, '(x) => floor(x * 5) / 5: five steps'],
];

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  const t = vfx.addTransition(box, { transition: Swipe, duration: 1.4 });
  let pick = 0;
  let run = 0;
  drive(kit, t, {
    label: () => `ease ${EASES[pick]![1]}`,
    showOpts: () => {
      if (stage.preview) pick = run++ % EASES.length;
      // A function gets progress clamped to 0..1 and returns t.
      return { ease: EASES[pick]![0] };
    },
  });
  if (stage.bar) {
    select(stage.bar, 'ease', EASES.map(([e, label], i) => [i, label] as const), (i) => (pick = i));
  }
  return () => stage.dispose();
};

export default mount;

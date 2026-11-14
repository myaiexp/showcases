// overflow on a run decides how far Zoom may draw outside the box
import { Zoom } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const OPTIONS: readonly (readonly [true | number | undefined, string])[] = [
  [undefined, "not set: Zoom's own true"],
  [0, 'overflow: 0 (stay inside)'],
  [40, 'overflow: 40 (px on every side)'],
  [true, 'overflow: true (whole canvas)'],
];

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  const t = vfx.addTransition(box, { transition: Zoom, duration: 1.4 });
  let pick = 0;
  let run = 0;
  drive(kit, t, {
    label: () => OPTIONS[pick]![1],
    showOpts: () => {
      if (stage.preview) pick = run++ % OPTIONS.length;
      const overflow = OPTIONS[pick]![0];
      return overflow === undefined ? {} : { overflow };
    },
    ms: 2800,
  });
  if (stage.bar) {
    select(stage.bar, 'run option', OPTIONS.map(([v, label], i) => [i, label] as const), (i) => (pick = i));
  }
  return () => stage.dispose();
};

export default mount;

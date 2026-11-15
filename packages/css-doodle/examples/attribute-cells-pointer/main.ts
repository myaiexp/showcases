// @udx and @udy: letters near the pointer rise and turn pink
import type { Mount } from '@/types.ts';
import { paper } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the letters.' });
  const rise = paper(stage, 'cd-cells-rise', 'Move the pointer over these letters', 'p');
  stage.doodle(
    `
    display: inline-block;
    font: 700 1.5rem sans-serif;
    --k: $(max(0, 1 - hypot(@udx, @udy) / 40));
    translate: 0 $px(k * -12);
    color: color-mix(in oklab, #e6437d $%(k * 100), #111);
  `,
    { attrs: { cells: '#cd-cells-rise::letters' }, frame: 'free', parent: rise.parentElement! },
  );
  if (stage.preview) {
    // The doodle listens for pointermove on the element holding the letters.
    stage.frame((t) => {
      const box = rise.getBoundingClientRect();
      const x = box.left + box.width * (0.5 + 0.5 * Math.sin(t * 1.1));
      rise.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: box.top + box.height / 2 }));
    });
    stage.say('A pretend pointer sweeps the text');
  }
  return () => stage.dispose();
};

export default mount;

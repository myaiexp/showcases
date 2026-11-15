// Pointer-colored conic gradient
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghostPointer } from '../../shared/b-pointer.ts';
const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the doodle.' });
  const doodle = stage.doodle(`
    @grid: 1 / 100%;
    background: conic-gradient(
      from $deg(@ux - @uy),
      hsl($deg(@ux * 2), 85%, 55%),
      hsl($deg(120 + @uy * 2), 85%, 65%),
      hsl($deg(240 + @ux + @uy), 85%, 45%),
      hsl($deg(@ux * 2), 85%, 55%)
    );
  `);
  if (ctx.preview) ghostPointer(stage, doodle);
  stage.say('The gradient is made of $deg(@ux …) sums');
  return () => stage.dispose();
};

export default mount;

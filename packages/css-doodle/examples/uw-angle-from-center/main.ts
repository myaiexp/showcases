// Doodle size in pixels: @uw and @uh
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { breathe } from '../../shared/b-pointer.ts';
const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 8 / 100% / #f5f5f0;
    background: #000;
    @size: 55%;
    margin: auto;
    rotate: atan2(
      calc((@y - .5) / @Y * @uh - @uh / 2),
      calc((@x - .5) / @X * @uw - @uw / 2)
    );
  `);
  breathe(stage, doodle);
  stage.say('The doodle is squeezed and stretched; the angles follow');
  return () => stage.dispose();
};

export default mount;

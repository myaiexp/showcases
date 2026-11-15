// Polygon points and random hex colors
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 4 / 100% _1px / #f5f5f0;
    background: #@rep6(@p([0-9a-f]));
    clip-path: polygon(
      @m3(@M2(@r(100%)))
    );
    transition: .6s;
  `);
  stage.reroll(doodle);
  stage.say('@M joins with spaces, @m with commas, @rep with nothing');
  return () => stage.dispose();
};

export default mount;

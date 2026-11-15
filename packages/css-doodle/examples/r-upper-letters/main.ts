// Noise letters
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 10 / 100% / #fff;
    font-size: .8em;
    @content: @R(a, z, 2);
  `);
  stage.reroll(doodle);
  stage.say('Letters drift smoothly across the grid');
  return () => stage.dispose();
};

export default mount;

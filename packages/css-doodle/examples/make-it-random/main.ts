// css-doodle example: @p and @r pick a shape and a scale per cell; a new seed redraws
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // @p picks one of the corner shapes at random, @r(.5, 1) a scale in that range.
  // The transition is plain CSS, so the cells glide to their new values on each render.
  const doodle = stage.doodle(`
    @grid: 7 / 100% / #333;
    border-radius: @p(100% 0, 0 100%);
    background: #fff;
    scale: @r(.5, 1);
    transition: .6s ease;
  `);

  // Every update() without a seed attribute draws with a new seed.
  stage.reroll(doodle);
  doodle.addEventListener('render', () => stage.say(`seed ${doodle.seed}`));
  return () => stage.dispose();
};

export default mount;

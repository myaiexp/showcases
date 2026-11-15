// An open list with ...
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 5 / 100% _1px / #000;
    background: #000;
    color: #fff;
    @content: @p(1, 2, ...);
  `);
  stage.reroll(doodle);
  stage.say('The list is 1 to 25, one value per cell');
  return () => stage.dispose();
};

export default mount;

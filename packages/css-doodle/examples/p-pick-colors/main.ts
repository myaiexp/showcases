// Picking at random with @p
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 5 / 100% _1px / #f5f5f0;
    background: @p(#000, #e6437d, #ebbf4d);
    transition: .5s;
  `);
  stage.reroll(doodle);
  stage.say('Each cell picks again');
  return () => stage.dispose();
};

export default mount;

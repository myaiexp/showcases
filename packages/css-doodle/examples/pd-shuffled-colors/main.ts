// Shuffled picks with @pd
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 5 / 100% _1px / #f5f5f0;
    background: @pd(#000, #e6437d, #ebbf4d, #fff);
    transition: .5s;
  `);
  stage.reroll(doodle);
  stage.say('Each round of four cells has every colour once');
  return () => stage.dispose();
};

export default mount;

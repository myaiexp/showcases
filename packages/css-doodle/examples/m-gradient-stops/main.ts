// Repeating gradient stops
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 1 / 100% / #f5f5f0;
    background: repeating-radial-gradient(
      @m3(@p(#000, #e6437d, #ebbf4d) @n(*10%))
    );
    transition: .6s;
  `);
  stage.reroll(doodle);
  stage.say('Random functions in @m are re-evaluated per step');
  return () => stage.dispose();
};

export default mount;

// Reusing a picked color with @lp
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 5 / 100% _1px / #f5f5f0;
    background: linear-gradient(
      @pd(45deg, -45deg),
      @p(#2a9d8f, #e9c46a, #f4a261, #e76f51),
      #fff,
      @lp
    );
  `);
  stage.reroll(doodle);
  stage.say('The gradient starts and ends on the same pick');
  return () => stage.dispose();
};

export default mount;

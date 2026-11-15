// @pn and @pnr together
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 6 / 100% _1px / #f5f5f0;
    background: #000;
    @cell(y % 2 = 1) {
      opacity: @pn(.2, .4, .6, .8, 1);
    }
    @cell(y % 2 = 0) {
      opacity: @pnr(.2, .4, .6, .8, 1);
    }
  `);
  stage.say('Odd rows go forward, even rows go backward');
  return () => stage.dispose();
};

export default mount;

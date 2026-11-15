// @PN follows the sequence step
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 1 / 100% / #f5f5f0;
    background: @m2x2.doodle(
      @grid: 1 / 100%;
      background: #000;
      @shape: @PN(circle, triangle, hexagon, star);
    );
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: @m2x2(
      @nx(*100%, -100%) @ny(*100%, -100%)
    );
  `);
  stage.say('Four nested doodles, four shapes in order');
  return () => stage.dispose();
};

export default mount;

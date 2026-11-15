// Carrying a list on with ...
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 1x24 / 100% / #f5f5f0;
    @place: center;
    @size: @pn(100%, 96%, ...);
    border: 1px solid #000;
    rotate: @pn(0, 4deg, ...);
  `);
  stage.say('Each cell goes one more step');
  return () => stage.dispose();
};

export default mount;

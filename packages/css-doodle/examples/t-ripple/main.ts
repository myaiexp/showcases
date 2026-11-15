// A ripple from angle and time
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 21 / 100% / #f5f5f0;
    border-radius: 50%;
    background: #000;
    scale: sin(@atan2(@dy, @dx) + @t(/500));
  `);
  stage.say('Time is added to each cell’s angle from the center');
  return () => stage.dispose();
};

export default mount;

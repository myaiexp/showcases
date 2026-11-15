// A clock from @TS
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 3x1 / 100% auto / #f5f5f0;
    @size: 80% auto;
    aspect-ratio: 1;
    margin: auto;
    border: 1px solid #000;
    border-radius: 50%;
    background: linear-gradient(#e6437d, #e6437d) 50% 0 / 3% 50% no-repeat;
    rotate: @pn(@TS(*6deg, %360deg), @TS(*.1deg, %360deg), @TS(*.008333deg, %360deg));
  `, { frame: 'wide' });
  stage.say('Seconds, minutes and hours, read from the clock');
  return () => stage.dispose();
};

export default mount;

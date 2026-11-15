// Time units: @t, @ts and $deg
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 4x1 / 100% auto / #f5f5f0;
    @size: 80% 3px;
    background: #000;
    margin: auto;
    rotate: @pn(@t(*.1deg), @ts(*90deg), @t(%360deg), $deg(@t / 10));
  `, { frame: 'wide' });
  stage.say('Four spellings of a turning angle');
  return () => stage.dispose();
};

export default mount;

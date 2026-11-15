// Concentric rings from @n
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 1 / 100% / #f5f5f0;
    background: radial-gradient(
      @m10(
        @p(#000, #e6437d, #ebbf4d) @n(*10%),
        #0000 0
      )
    );
  `);
  stage.reroll(doodle);
  stage.say('Each step is a ring: color up to @n(*10%), then transparent');
  return () => stage.dispose();
};

export default mount;

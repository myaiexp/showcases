// Picking from a variable
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 6 / 100% _1px / #f5f5f0;
    --colors: #cc063e, #fd9407, #e2d9c2, #10898b;
    background: @p(--colors);
    @shape: @p(circle, hexagon);
  `);
  stage.reroll(doodle);
  stage.say('@p(--colors) reads the list in the variable');
  return () => stage.dispose();
};

export default mount;

// Distance from the pointer to each cell
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghostPointer } from '../../shared/b-pointer.ts';
const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the doodle.' });
  const doodle = stage.doodle(`
    @grid: 16 / 100% / #f5f5f0;
    background: #000;
    border-radius: 50%;
    
    --d: hypot(@udx, @udy);
    scale: max(0, 1.1 - $d / @uw * 1.5);
  `);
  if (ctx.preview) ghostPointer(stage, doodle);
  stage.say('scale: max(0, 1.1 - $d / @uw * 1.5)');
  return () => stage.dispose();
};

export default mount;

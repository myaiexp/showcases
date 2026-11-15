// A dot that follows the pointer
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghostPointer } from '../../shared/b-pointer.ts';
const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the doodle.' });
  const doodle = stage.doodle(`
    @grid: 1 / 100% / #f5f5f0;
    @size: 20%;
    @place: @ux(*1px) @uy(*1px);
    border-radius: 50%;
    background: #000;
  `);
  if (ctx.preview) ghostPointer(stage, doodle);
  stage.say('@place: @ux(*1px) @uy(*1px)');
  return () => stage.dispose();
};

export default mount;

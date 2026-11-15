// Every needle points at the pointer
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghostPointer } from '../../shared/b-pointer.ts';
const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the doodle.' });
  const doodle = stage.doodle(`
    @grid: 9 / 100% / #f5f5f0;
    @size: 70% 2px;
    background: #000;
    margin: auto;
    rotate: atan2(@udy, @udx);
  `);
  if (ctx.preview) ghostPointer(stage, doodle);
  stage.say('rotate: atan2(@udy, @udx)');
  return () => stage.dispose();
};

export default mount;

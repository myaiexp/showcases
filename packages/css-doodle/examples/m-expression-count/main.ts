// An expression as the count
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 5x4 / 100% auto _1px / #000;
    color: #fff;
    font-size: .45em;
    line-height: 1;
    word-break: break-all;
    @content: @M(@i, ●);
  `, { frame: 'wide' });
  stage.say('Cell 12 repeats the dot twelve times');
  return () => stage.dispose();
};

export default mount;

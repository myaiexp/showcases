// A wave from time and index
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 20x1 / 100% auto / #f5f5f0;
    @gap: 1px;
    @size: 100% 20%;
    background: #000;
    margin: auto;
    translate: 0 calc(100% * sin(3*@t(/30, +@i(*8), %360deg)));
  `, { frame: 'wide' });
  stage.say('@t moves every cell; @i offsets each one');
  return () => stage.dispose();
};

export default mount;

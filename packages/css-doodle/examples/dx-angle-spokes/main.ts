// Pointing at the center with @da
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 9 / 100% / #f5f5f0;
    @size: 70% 2px;
    background: #000;
    rotate: @da(*1rad);
    margin: auto;
    @cell(dr < 1) {
      @size: 30%;
      border-radius: 50%;
    }
  `);
  stage.say('rotate: @da(*1rad) turns each line toward the center');
  return () => stage.dispose();
};

export default mount;

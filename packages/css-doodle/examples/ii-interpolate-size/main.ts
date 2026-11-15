// Interpolating a size across the cells
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 10x1 / 100% auto / #f5f5f0;
    @place: center;
    @size: @Ii(*100%);
    background: #000;
    opacity: @iI;
    border-radius: 50%;
  `, { frame: 'wide' });
  stage.say('Large dim cells behind, small dark ones in front');
  return () => stage.dispose();
};

export default mount;

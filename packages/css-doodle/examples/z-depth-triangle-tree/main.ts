// Depth: a tree of triangles
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 1x3x4 / 100% / #f5f5f0;
    @size: 50%;
    position: absolute;
    bottom: 0;
    left: @pn(50%, 0);
    
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    
    &:first-child {
      top: 0;
      transform: translateX(-50%);
    }
    &:empty {
      background: #000;
    }
  `);
  stage.say('Every cell holds three smaller cells, four levels down');
  return () => stage.dispose();
};

export default mount;

// Depth: a branching tree with @z(n)
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 1x2x10 / 100% / #f5f5f0;
    
    @size: 100%;
    position: absolute;
    bottom: 90%;
    left: 0;
    transform-origin: 50% 100%;
    transform: rotate(@pn(26deg, -20deg)) scale(.72);
    background: #000;
    
    @z(1) {
      bottom: 0;
      left: 50%;
      width: 4.4%;
      height: 26%;
      transform: none;
    }
  `);
  stage.say('@z(1) styles the trunk; every other level branches');
  return () => stage.dispose();
};

export default mount;

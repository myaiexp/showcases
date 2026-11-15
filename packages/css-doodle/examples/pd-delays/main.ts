// Shuffled delays with ...
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 8 / 100% _2px / #f5f5f0;
    background: #000;
    animation: s 1s ease-in-out infinite alternate;
    animation-delay: @pd(0s, -.05s, ...);
    @keyframes s {
      to { scale: .2 }
    }
  `);
  stage.reroll(doodle);
  stage.say('A shuffled delay for every cell');
  return () => stage.dispose();
};

export default mount;

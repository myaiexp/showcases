// Smooth noise with @R
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 20 / 100%;
    background: hsl(@R(0, 360), 70%, 60%);
    transition: 1s;
  `);
  stage.reroll(doodle);
  stage.say('Neighbouring cells get similar values');
  return () => stage.dispose();
};

export default mount;

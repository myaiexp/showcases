// Dice with @ri(1, 6)
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 6 / 100% _1px / #000;
    background: #000;
    color: #fff;
    @content: @ri(1, 6);
    font: 700 1.4em / 1 monospace;
  `);
  stage.reroll(doodle);
  stage.say('A new roll for every cell and every seed');
  return () => stage.dispose();
};

export default mount;

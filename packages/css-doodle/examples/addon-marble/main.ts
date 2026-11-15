// @marble(): ink drops on water combed into feathers
import '@css-doodle/addons/marble';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @use: marble;
    @grid: 1 / 100%;
    background: @marble(
      colors: white, #002185, #fcd200;
      drops: 60;
      size: 6%;
      comb: 5% 90deg, 14% 0deg;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 3200);
  stage.say('Sixty drops, then a comb pulled down and one across');
  return () => stage.dispose();
};

export default mount;

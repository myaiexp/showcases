// @wfc() fills the grid so every 3 × 3 window looks like part of a sample
import '@css-doodle/addons/wfc';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @use: wfc;
    @grid: 24 / 100%;
    background: @wfc(
      sample:
        ................
        ..ooo...........
        ..o*o......ooo..
        ..ooo......o*o..
        ...|.......ooo..
        ...|l.......|...
        ..l|........|...
        ...|.......l|...
        ...|........|l..
        ################;
      legend: . #fbe9d0, o #e63946, * #f1c453,
        | #2d6a4f, l #52b788, # #6b4423;
      symmetry: 2;
      ground;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 2600);
  stage.say('ground keeps the soil at the bottom; symmetry: 2 never turns flowers upside down');
  return () => stage.dispose();
};

export default mount;

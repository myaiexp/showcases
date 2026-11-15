// @plot.scatter(path: @trace(…)) spreads the cells over the inside of a traced picture
import '@css-doodle/addons/trace';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CAT } from '../../shared/trace-images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @use: trace;
    @grid: 1x${ctx.preview ? 240 : 500} / 100% / #10151f;
    @size: 2.5%;
    border-radius: 50%;
    background: @p(#f1c453, #e63946, #fbe9d0);
    @place: @plot.scatter(path: @trace(${CAT}));
    transition: .8s;
  `);
  stage.reroll(doodle, 2600);
  stage.say('Every dot lands inside the outline, eyes left empty');
  return () => stage.dispose();
};

export default mount;

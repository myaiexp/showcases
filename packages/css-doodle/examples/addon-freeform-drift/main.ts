// Four freeform-gradient points wander, each with its own random speeds
import '@css-doodle/addons/gradient-2d';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each call of $drift() gets its own @r() speeds, so every point wanders its own way;
// a new seed sends them on new paths.
const code = `
    @use: gradient-2d;
    @grid: 1 / 100%;
    --drift(): (50% + 30% * sin(t * @r(.2, .6) + @r(9))
      + 15% * sin(t * @r(.6, 1.2) + @r(9)));
    @content: @freeform-gradient(
      #f56 at $drift() $drift(),
      gold at $drift() $drift(),
      #0c9 at $drift() $drift(),
      #2b2d86 at $drift() $drift()
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 4000);
  stage.say('Every $drift() call draws its own @r speeds');
  return () => stage.dispose();
};

export default mount;

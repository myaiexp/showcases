// css-doodle example: a raymarched tunnel written in @pattern, animated by time t
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // @pattern compiles its body to a fragment shader: repeat(60) marches a ray,
  // t is time in seconds, and ramp() maps the distance to a colour gradient.
  stage.doodle(
    `
    @grid: 1 / 100% auto (16/9);
    @content: @pattern(
      d: 0;
      repeat(60) {
        p: vec3(rot(pos, t/4) * d, d + t);
        d: d + .7length(fract(p) - .5) - .1;
      }
      fill: ramp(d / 10,
        #fff, #fd7 .1, #e46 .3, #07121f
      );
    );
  `,
    { frame: 'wide' },
  );
  stage.say('t is time: the pattern moves on its own');
  return () => stage.dispose();
};

export default mount;

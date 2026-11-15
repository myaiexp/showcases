// sdf { d: … }: a sphere with a bumpy surface
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      sdf {
        d: length(p) - .6
          + .04 * sin(20 * p.x) * sin(20 * p.y) * sin(20 * p.z);
      }
      view: 40t 20;
    );
  `,
  say: "Everything below d = 0 is inside",
});

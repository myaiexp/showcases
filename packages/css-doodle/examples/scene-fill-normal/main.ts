// fill reads normal: color from the surface direction
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      box { size: 1; round: .2; fill: .5 + .5 * normal }
      view: 35t 25;
    );
  `,
  say: "Facing right is red, up is green, toward you is blue",
});

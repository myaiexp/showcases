// The 2D distances in 3D: a bent tube from arc()
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      sdf {
        d: length(vec2(arc(p.xy, .5, 0, 1.5π), p.z)) - .08;
        fill: #f06;
      }
      view: 20t 30;
    );
  `,
  say: "arc() measures in the plane; p.z thickens it into a tube",
});

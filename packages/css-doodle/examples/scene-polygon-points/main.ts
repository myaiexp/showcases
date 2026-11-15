// polygon with points: x y, …
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      polygon {
        points: -1 -.3, .2 -.3, .2 -.8, 1 0, .2 .8, .2 .3, -1 .3;
        depth: .3;
        round: .04;
        fill: #2a9d8f;
      }
      view: 40t 20;
    );
  `,
  say: "Seven corners, one filled outline",
});

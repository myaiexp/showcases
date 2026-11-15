// n and N: twelve spheres around a ring
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      sphere*12 {
        r: .12;
        move: .8 0 0;
        rotate: y n * 30;
        fill: hsl(n / N, .7, .6);
      }
      view: 0 30;
    );
  `,
  say: "rotate: y n * 30 steps each copy round the axis",
});

// Colored lights and ambient: warm, cool, and the shade filled in
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      torus { r: .5 .2; fill: #fff }
      view: 20 50;
      light: -1 1 .5 #ffc98a, 1 0 .2 #5a7cff * .8;
      ambient: #3a4a7a #4a2a1a;
    );
  `,
  say: "An orange light from the left, a blue one from the right",
});

// Truchet tiles: random arcs in each cell with arc() and rand()
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      grid: 10;
      fill: #14213d;
      q: vec2(match(rand() < .5, -1., 1.) * du, -dv);
      d: min(abs(length(q - .5) - .5), abs(length(q + .5) - .5));
      fill: #fca311, shape(d, .12);
    );
  `,
  reroll: true,
  say: "Two arcs per tile, mirrored by a coin flip",
});

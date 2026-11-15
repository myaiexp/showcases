// @tile.voronoi gives each path the next piece
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1 -1 2 2;
        path*40 {
          d: @tile.voronoi(heart; bound: shape);
          fill: @p(#e6437d, #f2efe6, #000);
          stroke: #000;
          stroke-width: .02;
          stroke-linejoin: round;
        }
      );
    `,
    reroll: true,
    say: "d: @tile.voronoi(heart; bound: shape)",
});

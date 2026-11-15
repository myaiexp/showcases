// A bare M starts a new arc: two corners make a tile
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 6 6;
        fill: none;
        stroke: #000;
        stroke-width: .12;
        stroke-linecap: round;
        path*6x6 {
          d: @arc(.5, 0 to 90) M @arc(.5 at 1, 180 to 270);
          transform: translate(@nx(-1) @ny(-1)) rotate(@p(0, 90) .5 .5);
        }
      );
    `,
    reroll: true,
    say: "transform: translate(…) rotate(@p(0, 90) .5 .5)",
});

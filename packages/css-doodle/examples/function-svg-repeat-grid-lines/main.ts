// line*16x16 with @nx, @ny and a random direction
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 16 16 padding .2;
        stroke: #000;
        stroke-width: .4;
        stroke-linecap: round;
        line*16x16 {
          x1, y1, x2, y2: @p(
            @nx(-1) @ny(-1) @nx @ny,
            @nx @ny(-1) @nx(-1) @ny,
            @nx @ny(-1) @nx @ny
          );
        }
      );
    `,
    reroll: true,
    say: "viewBox: 0 0 16 16 padding .2",
});

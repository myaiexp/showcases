// A match block keeps elements where the test holds
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "both diagonals", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        g*5x5 {
          transform: translate($(@nx * 2 - 1) $(@ny * 2 - 1));
          circle { r: .5 }
          @match(@nx == @ny || @nx + @ny == 6) {
            fill: #e6437d;
            circle {
              r: .8;
              fill: none;
              stroke: #000;
              stroke-width: .15;
            }
          }
        }
      );
    ` },
      { label: "middle row", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        g*5x5 {
          transform: translate($(@nx * 2 - 1) $(@ny * 2 - 1));
          circle { r: .5 }
          @match(@ny == 3) {
            fill: #e6437d;
            circle {
              r: .8;
              fill: none;
              stroke: #000;
              stroke-width: .15;
            }
          }
        }
      );
    ` },
      { label: "checker", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        g*5x5 {
          transform: translate($(@nx * 2 - 1) $(@ny * 2 - 1));
          circle { r: .5 }
          @match((@nx + @ny) % 2 == 0) {
            fill: #e6437d;
            circle {
              r: .8;
              fill: none;
              stroke: #000;
              stroke-width: .15;
            }
          }
        }
      );
    ` },
    ],
    say: "The test reads n, nx and ny of the repeat",
});

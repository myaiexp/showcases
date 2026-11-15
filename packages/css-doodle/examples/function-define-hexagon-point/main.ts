// --at(a) returns two numbers for @m points
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "6", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1.2 -1.2 2.4 2.4;
        --at(a): $(cos(a)) $(sin(a));
        polygon {
          points: @m(6, $at($(n * π / 3)));
          fill: #e6437d;
        }
      );
    ` },
      { label: "5", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1.2 -1.2 2.4 2.4;
        --at(a): $(cos(a)) $(sin(a));
        polygon {
          points: @m(5, $at($(n * 2 * π / 5)));
          fill: #e6437d;
        }
      );
    ` },
      { label: "8", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1.2 -1.2 2.4 2.4;
        --at(a): $(cos(a)) $(sin(a));
        polygon {
          points: @m(8, $at($(n * π / 4)));
          fill: #e6437d;
        }
      );
    ` },
    ],
    say: "points: @m(6, $at($(n * π / 3)))",
});

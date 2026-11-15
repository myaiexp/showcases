// @linearGradient(45deg, stops) for fill and stroke
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 6 / 100%;
      background: @svg(
        viewBox: 10;
        rect {
          width, height: 10;
          fill: @linearGradient(45deg, #000, #e6437d, #ebbf4d);
        }
        circle {
          cx, cy: 5;
          r: @r(1.5, 4);
          fill: @linearGradient(45deg, #ebbf4d, #e6437d, #000);
        }
      );
    `,
    reroll: true,
    say: "fill: @linearGradient(45deg, #000, #e6437d, #ebbf4d)",
});

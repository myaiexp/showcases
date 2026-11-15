// rotate(a, .5, .5) turns a gradient about its center
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -5 -5 10 10;
        fill: none;
        stroke-width: .25;
        stroke-linecap: round;
        circle*12 {
          r: @n(*.38);
          stroke-dasharray: @r(2, 10) @r(1, 4);
          stroke: @linearGradient(
            rotate(@r(360), .5, .5),
            #000, #e6437d, #ebbf4d
          );
        }
      );
    `,
    reroll: true,
    say: "stroke: @linearGradient(rotate(@r(360), .5, .5), …)",
});

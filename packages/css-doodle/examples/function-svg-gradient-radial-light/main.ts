// translate() moves the center of a radial gradient
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        circle*40 {
          cx: @r(100);
          cy: @r(100);
          r: @r(3, 12);
          fill: @radialGradient(
            translate(-.2, -.2),
            #fff, @p(#e6437d, #ebbf4d) 40%, #000
          );
        }
      );
    `,
    reroll: true,
    say: "@radialGradient(translate(-.2, -.2), #fff, …, #000)",
});

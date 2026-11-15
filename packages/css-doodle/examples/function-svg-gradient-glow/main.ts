// A last stop at opacity 0 fades each circle into a glow
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000 @svg(
        viewBox: 100;
        circle*60 {
          cx: @r(100);
          cy: @r(100);
          r: @r(4, 20);
          fill: @radialGradient(
            @p(#e6437d, #ebbf4d, #fff),
            #000 100% 0
          );
        }
      );
    `,
    reroll: true,
    say: "@radialGradient(@p(…), #000 100% 0)",
});

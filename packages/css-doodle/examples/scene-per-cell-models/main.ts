// A scene in every cell: @r and @p inside the body
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 3 / 100% / #111;
    @content: @scene(
      box {
        size: .6;
        round: .06;
        rotate: 1 1 1 @r(360);
        fill: @p(#f06, #fc0, #0cf, #fff);
      }
    );
  `,
  reroll: true,
  say: "Each cell runs the scene body for itself",
});

// rand() and @pn in copies: each one different
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      sphere*14 {
        r: .06 + .08 * rand();
        move: .8cos(n * 26deg), (rand() - .5) * .8, .8sin(n * 26deg);
        fill: @pn(#f06, #fc0, #0cf);
      }
      view: 40t 30;
    );
  `,
  reroll: true,
  say: "Each copy rolls its own numbers",
});

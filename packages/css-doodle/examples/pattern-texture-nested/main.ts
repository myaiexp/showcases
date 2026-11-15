// A texture section that is only $name: a nested @doodle
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    --c: #14213d, #e63946, #fca311, #2a9d8f;
    --tex: @doodle(
      @grid: 6 / 100%;
      background: @p(--c);
    );
    @content: @pattern(
      texture0 { $tex }
      p: uv + .03 * vec2(sin(uv.y * 20 + t * 2), cos(uv.x * 20 + t * 2));
      fill: texture(texture0, p);
    );
  `,
  reroll: true,
  say: "The nested doodle sees --c from the outer one",
});

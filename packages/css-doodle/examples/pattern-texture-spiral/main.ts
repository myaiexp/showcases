// Sampling a texture along a spiral
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      texture_0 {
        background: linear-gradient(@r(360deg), @stripe(red, gold));
      }
      r: length(pos);
      s: 3atan(pos.y, pos.x) + 8log(r) - 2t;
      fill: texture(texture_0, .5 + r * vec2(cos(s), sin(s)));
    );
  `,
  reroll: true,
  say: "A new seed gives a new gradient angle",
});

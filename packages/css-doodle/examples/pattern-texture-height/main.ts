// A still texture as a height field: slope shading
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      texture0 {
        @grid: 1 / 100%;
        background: @pattern(
          fill: fbm(uv * 5);
        );
      }
      e: .004;
      sx: texture(texture0, uv + vec2(e, 0)).x - texture(texture0, uv - vec2(e, 0)).x;
      sy: texture(texture0, uv + vec2(0, e)).x - texture(texture0, uv - vec2(0, e)).x;
      l: normalize(vec3(cos(t), sin(t), .6));
      n: normalize(vec3(-sx * 30, -sy * 30, 1));
      fill: ramp(dot(n, l), #14213d, #e9c46a);
    );
  `,
  reroll: true,
  say: "The slope comes from differences between neighboring texels",
});

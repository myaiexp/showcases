// Sections in custom properties: --fragment: @raw(…) and --texture: @doodle(…)
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    --c: #000, #e6437d, #ebbf4d;
    --fragment: @raw(
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        uv.x += sin(uv.y * 20. + u_time) * .02;
        FragColor = texture(texture0, uv);
      }
    );
    --texture: @doodle(
      @grid: 8 / 100%;
      background: @p(--c);
    );
    @content: @shaders(
      fragment { $fragment }
      texture0 { $texture }
    );
  `,
  reroll: true,
  say: "The same shader as before, assembled from variables",
});

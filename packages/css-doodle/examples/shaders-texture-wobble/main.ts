// texture0 { … }: a doodle bound as a sampler2D
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      fragment {
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          uv.x += sin(uv.y * 20. + u_time) * .02;
          FragColor = texture(texture0, uv);
        }
      }
      texture0 {
        @grid: 8 / 100%;
        background: @p(#000, #e6437d, #ebbf4d);
      }
    );
  `,
  reroll: true,
  say: "The doodle is an ordinary css-doodle, drawn once and sampled",
});

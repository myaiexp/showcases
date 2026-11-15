// Several texture sections: texture0 and texture1
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      fragment {
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          float k = smoothstep(-.1, .1, sin(u_time + uv.x * 4.) * .5 + uv.y - .5);
          FragColor = mix(texture(texture0, uv), texture(texture1, uv), k);
        }
      }
      texture0 {
        @grid: 6 / 100% / #14213d;
        background: radial-gradient(#fca311 40%, transparent 41%);
      }
      texture1 {
        background: repeating-linear-gradient(45deg, #e63946 0 12px, #1d3557 12px 24px);
      }
    );
  `,
  say: "Each texture is bound under its own name",
});

// Shortcuts: gl_FragColor, texture2D, precision and // comments
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      fragment {
        // an own precision line replaces highp
        precision mediump float;
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution;
          uv += .03 * vec2(sin(u_time + uv.y * 9.), cos(u_time + uv.x * 9.));
          gl_FragColor = texture2D(texture0, uv); // old-style names
        }
      }
      texture0 {
        @grid: 5 / 100%;
        background: @p(#264653, #2a9d8f, #e9c46a, #f4a261, #e76f51);
      }
    );
  `,
  reroll: true,
  say: "Older GLSL spellings still work",
});

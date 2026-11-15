// Sizes: @shaders, @shaders64x36 and @shaders24x14
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@shaders", code: `
        @grid: 1 / 100%;
        @content: @shaders(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            float v = .5 + .5 * sin(10. * length(pos) - u_time * 2. + 3. * p.x);
            FragColor = vec4(v, .4 * v, 1. - v, 1);
          }
        );
      ` },
    { label: "@shaders64x36", code: `
        @grid: 1 / 100%;
        @content: @shaders64x36(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            float v = .5 + .5 * sin(10. * length(pos) - u_time * 2. + 3. * p.x);
            FragColor = vec4(v, .4 * v, 1. - v, 1);
          }
        );
      ` },
    { label: "@shaders24x14", code: `
        @grid: 1 / 100%;
        @content: @shaders24x14(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            float v = .5 + .5 * sin(10. * length(pos) - u_time * 2. + 3. * p.x);
            FragColor = vec4(v, .4 * v, 1. - v, 1);
          }
        );
      ` },
  ],
  frame: "wide",
  say: "Same shader, three image sizes",
});

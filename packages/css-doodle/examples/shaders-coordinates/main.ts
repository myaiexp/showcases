// gl_FragCoord and u_resolution: coordinates as color
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "vec4(p.yx, .8, 1)", code: `
        @grid: 1 / 100%;
        @content: @shaders(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            FragColor = vec4(p.yx, .8, 1);
          }
        );
      ` },
    { label: "vec4(p, 0, 1)", code: `
        @grid: 1 / 100%;
        @content: @shaders(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            FragColor = vec4(p, 0, 1);
          }
        );
      ` },
    { label: "distance to the middle", code: `
        @grid: 1 / 100%;
        @content: @shaders(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            FragColor = vec4(vec3(length(p - .5) * 1.6), 1);
          }
        );
      ` },
    { label: "checker", code: `
        @grid: 1 / 100%;
        @content: @shaders(
          void main() {
            vec2 p = gl_FragCoord.xy / u_resolution;
            FragColor = vec4(vec3(mod(floor(p.x * 8.) + floor(p.y * 8.), 2.)), 1);
          }
        );
      ` },
  ],
  say: "No uniform changes, so each is drawn once",
});

// pos: the centered position keeps circles round on any shape
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      void main() {
        vec2 c = vec2(.55 * sin(u_time), .25 * cos(1.5 * u_time));
        float d = length(pos - c);
        vec3 col = vec3(.05, .09, .18);
        col = mix(vec3(.95, .4, .5), col, smoothstep(.18, .19, d));
        col += vec3(.2, .5, .9) * smoothstep(.012, 0., abs(length(pos) - .35));
        FragColor = vec4(col, 1);
      }
    );
  `,
  frame: "wide",
  say: "pos.y points up and the short side is -0.5 to 0.5",
});

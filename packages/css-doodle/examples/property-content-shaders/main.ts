// @content: @shaders fills a cell with a canvas running a fragment shader
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      void main() {
        float a = atan(pos.y, pos.x);
        float r = .1 / length(pos);
        float t = r * 8. - u_time + a;
        vec3 k = vec3(0., 2., 4.);
        vec3 c = .5 + .5 * cos(t + k);
        FragColor = vec4(c, 1.);
      }
    );
  `,
});

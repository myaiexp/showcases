// u_time: an animated spiral from atan and length
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      void main() {
        float a = atan(pos.y, pos.x);
        float r = length(pos);
        vec3 c = cos(vec3(1, 2, 3) + 2.*a + 12.*r - u_time);
        FragColor = vec4(.4 + .6*c, 1);
      }
    );
  `,
  say: "Reading u_time makes css-doodle redraw each frame",
});

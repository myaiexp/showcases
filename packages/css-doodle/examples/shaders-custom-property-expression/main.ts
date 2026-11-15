// $name in an expression: --speed: @r(1, 3) feeds the shader
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 3 / 100% _3px;
    --speed: @r(1, 3);
    @content: @shaders(
      void main() {
        float v = .5 + .5 * sin(30. * length(pos) - u_time * float($speed));
        FragColor = vec4(vec3(v) * vec3(.9, .5, 1.), 1);
      }
    );
  `,
  reroll: true,
  say: "One shader text, nine speeds",
});

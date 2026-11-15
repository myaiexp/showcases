// u_seed: a color per cell from the seed
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 3 / 100% _3px;
    background: @shaders(
      void main() {
        float r = length(pos);
        vec3 c = .5 + .5 * cos(6.2832 * (u_seed.x + vec3(0., .33, .67)) + 40. * r * (.3 + u_seed.y));
        FragColor = vec4(c, 1);
      }
    );
  `,
  reroll: true,
  say: "Same colors everywhere, a different ring count per cell",
});

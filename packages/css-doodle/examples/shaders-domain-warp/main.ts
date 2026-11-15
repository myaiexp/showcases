// A domain-warped noise field with u_time and a hash
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3. - 2. * f);
        return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y);
      }
      void main() {
        vec2 p = pos * 3.;
        float t = u_time * .3;
        vec2 q = vec2(n(p + t), n(p + 5.2 - t));
        vec2 r = vec2(n(p + 4. * q + 1.7), n(p + 4. * q + 8.3));
        float v = n(p + 4. * r);
        FragColor = vec4(.5 + .5 * cos(6.2832 * (v + vec3(0., .1, .2)) + 1.), 1);
      }
    );
  `,
  say: "Noise of noise of noise",
});

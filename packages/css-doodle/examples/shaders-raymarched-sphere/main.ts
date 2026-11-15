// A raymarched sphere in plain GLSL
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      float map(vec3 p) {
        p.y -= .25 * sin(u_time * 1.5);
        return min(length(p) - .8, p.y + 1.1);
      }
      void main() {
        vec3 ro = vec3(0, 0, -3);
        vec3 rd = normalize(vec3(pos * 1.6, 1.4));
        float t = 0.;
        for (int i = 0; i < 48; i++) {
          float d = map(ro + rd * t);
          if (d < .001 || t > 8.) break;
          t += d;
        }
        vec3 col = vec3(.04, .06, .12);
        if (t < 8.) {
          vec3 p = ro + rd * t;
          vec2 e = vec2(.002, 0);
          vec3 n = normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
          float l = max(dot(n, normalize(vec3(-.6, .8, -.5))), 0.);
          col = vec3(.9, .5, .3) * (.15 + .85 * l);
        }
        FragColor = vec4(col, 1);
      }
    );
  `,
  say: "Functions besides main() are fine too",
});

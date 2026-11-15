// u_frameIndex and u_timeDelta: counting frames
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @shaders(
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float f = float(u_frameIndex % 120) / 120.;
        float bar = step(uv.x, f) * step(.4, uv.y) * step(uv.y, .6);
        float fps = clamp(u_timeDelta * 30., 0., 1.);
        vec3 c = vec3(.08, .12, .2) + bar * mix(vec3(.2, .8, .5), vec3(1., .6, .2), fps);
        FragColor = vec4(c, 1);
      }
    );
  `,
  say: "Frame counter as a bar; its tint is the frame time",
});

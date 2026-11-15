// Pixels and variables: fire from fbm
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @pattern(
      n: fbm(uv.x*6, uv.y*6 - t*4);
      h: clamp(2n * pow(1 - uv.y, 1.2), 0, 1);
      fill: vec3(1.9h, 1.5h*h, pow(h, 2)*.8)
    );
  `,
  say: "uv runs 0 to 1 from the bottom-left corner",
});

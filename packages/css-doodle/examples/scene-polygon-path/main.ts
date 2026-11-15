// polygon { path }: an SVG path as the outline
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      polygon {
        path: M 0 -1 C 1 -.4, 1 .4, 0 1 C -1 .4, -1 -.4, 0 -1 Z;
        depth: .2;
        fill: #4a8;
      }
      view: 50t 15;
    );
  `,
  say: "The path is drawn in the xy plane and given depth",
});

// lathe*3 and n inside the outline
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      lathe*3 {
        circle { r: .1n; move: .3n 0 }
        move: n * 1.2 - 2.4, 0, 0;
        fill: hsl(n / 4, .7, .6);
      }
      view: 0 20;
    );
  `,
  say: "Three copies, three outline sizes",
});

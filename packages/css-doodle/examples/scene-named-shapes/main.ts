// name#id and #id: keep a shape and draw it where needed
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      torus#ring { r: .4 .1 }
      #ring { move: -.9 0 0; fill: #e63946 }
      #ring { rotate: x 90; fill: #fca311 }
      #ring { move: .9 0 0; rotate: z 90; fill: #3a86ff }
      view: 20t 25;
    );
  `,
  say: "One torus, three uses",
});

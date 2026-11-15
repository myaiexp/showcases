// A user function in a scene: --name() and $name()
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    --tint(a): hsl(a / 12, .7, .6);
    @content: @scene(
      sphere*12 {
        r: .1;
        move: .8 0 0;
        rotate: y n * 30;
        fill: $tint(n);
      }
      view: 20t 30;
    );
  `,
  say: "The function is called once per copy",
});

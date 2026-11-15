// @raw(@svg(...)) puts the SVG in as markup
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      @content: @raw(@svg(
        viewBox: -5 -5 10 10;
        circle*8 {
          cx, cy: @Plot(r: 3);
          r: @r(.3, 1);
          fill: #000;
        }
      ));
    `,
    reroll: true,
    say: "@content: @raw(@svg(...))",
});

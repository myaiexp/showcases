// @shape(star) as d, in a box from -1 to 1
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "star", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1 -1 2 2;
        path*5 {
          d: @shape(star);
          transform: scale($(1.2 - n * .2)) rotate($(n * 36));
          fill: @pn(#000, #e6437d);
        }
      );
    ` },
      { label: "heart", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1 -1 2 2;
        path*5 {
          d: @shape(heart);
          transform: scale($(1.2 - n * .2)) rotate($(n * 36));
          fill: @pn(#000, #e6437d);
        }
      );
    ` },
      { label: "hexagon", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -1 -1 2 2;
        path*5 {
          d: @shape(hexagon);
          transform: scale($(1.2 - n * .2)) rotate($(n * 36));
          fill: @pn(#000, #e6437d);
        }
      );
    ` },
    ],
    say: "d: @shape(star), scaled and rotated per copy",
});

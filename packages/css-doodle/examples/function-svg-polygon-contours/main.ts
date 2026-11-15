// Two contours and fill-rule: evenodd cut a hole
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "evenodd", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        points: 120;
        r: 1, .6;
        fill-rule: evenodd;
        fill: #000;
        stroke: #e6437d;
        stroke-width: .03;
      );
    ` },
      { label: "nonzero", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        points: 120;
        r: 1, .6;
        fill-rule: nonzero;
        fill: #000;
        stroke: #e6437d;
        stroke-width: .03;
      );
    ` },
    ],
    say: "fill-rule: evenodd leaves the inner contour empty",
});

// fill paints the inside; r: cos(kt) draws a rose
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "cos(2t)", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        points: 200;
        r: cos(2t);
        stroke: #e6437d;
        stroke-width: .02;
        fill: #000;
      );
    ` },
      { label: "cos(3t)", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        points: 200;
        r: cos(3t);
        stroke: #e6437d;
        stroke-width: .02;
        fill: #000;
      );
    ` },
      { label: "cos(4t)", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        points: 200;
        r: cos(4t);
        stroke: #e6437d;
        stroke-width: .02;
        fill: #000;
      );
    ` },
      { label: "cos(5t)", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        points: 200;
        r: cos(5t);
        stroke: #e6437d;
        stroke-width: .02;
        fill: #000;
      );
    ` },
    ],
    say: "r: cos(4t)",
});

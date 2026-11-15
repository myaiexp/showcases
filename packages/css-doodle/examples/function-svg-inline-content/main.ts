// @content: @svg(...) puts the element in the cell
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "12 rings", code: `
      @grid: 1 / 100% auto;
      @content: @svg(
        viewBox: -5 -5 10 10;
        circle*12 {
          r: @nN(*4);
          fill: none;
          stroke: #000;
          stroke-width: .15;
        }
      );
    ` },
      { label: "6 rings", code: `
      @grid: 1 / 100% auto;
      @content: @svg(
        viewBox: -5 -5 10 10;
        circle*6 {
          r: @nN(*4);
          fill: none;
          stroke: #e6437d;
          stroke-width: .3;
        }
      );
    ` },
      { label: "24 rings", code: `
      @grid: 1 / 100% auto;
      @content: @svg(
        viewBox: -5 -5 10 10;
        circle*24 {
          r: @nN(*4);
          fill: none;
          stroke: #000;
          stroke-width: .08;
        }
      );
    ` },
    ],
    say: "The SVG is a real element in the cell",
});

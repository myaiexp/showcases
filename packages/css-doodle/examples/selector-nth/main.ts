// @nth picks cells by index, formula or odd/even, like :nth-child
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "5, 3n + 8, 1 2", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @nth(5) {
        @shape: hexagon;
        background: #fff;
        color: #000;
      }
      @nth(3n + 8) {
        background: #fff;
        color: #000;
      }
      @nth(1, 2) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "odd", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @nth(odd) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "even", code: `
      @grid: 4 / 100% _1px;
      @content: @i;
      
      @nth(even) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "not (2n)", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @nth not (2n) {
        background: #e6437d;
        color: #fff;
      }
    ` },
  ],
});

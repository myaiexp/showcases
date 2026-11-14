// @col picks columns by number, formula or odd/even; @x is an alias
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@col(even), @col(3)", code: `
      @grid: 5 / 100% _1px;
      @content: @x;
      
      @col(even) {
        background: #fff;
        color: #000;
      }
      @col(3) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "@col not (3)", code: `
      @grid: 5 / 100% _1px;
      @content: @x;
      
      @col not (3) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "@x(1, 5)", code: `
      @grid: 5 / 100% _1px;
      @content: @x;
      
      @x(1, 5) {
        background: #e6437d;
        color: #fff;
      }
    ` },
  ],
});

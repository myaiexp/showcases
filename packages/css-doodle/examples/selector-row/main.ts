// @row picks rows by number, formula or odd/even; @y is an alias
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@row(even), @row(3)", code: `
      @grid: 5 / 100% _1px;
      @content: @y;
      
      @row(even) {
        background: #fff;
        color: #000;
      }
      @row(3) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "@row not (3)", code: `
      @grid: 5 / 100% _1px;
      @content: @y;
      
      @row not (3) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "@y(1, 5)", code: `
      @grid: 5 / 100% _1px;
      @content: @y;
      
      @y(1, 5) {
        background: #e6437d;
        color: #fff;
      }
    ` },
  ],
});

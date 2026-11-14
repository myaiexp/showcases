// @cell picks by index, an+b formula or odd/even; not inverts
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@cell(1, 2, 3n)", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @cell(1, 2, 3n) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "@cell not (2n, x = 1)", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @cell not (2n, x = 1) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "@cell(odd)", code: `
      @grid: 4 / 100% _1px;
      @content: @i;
      
      @cell(odd) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "@cell(even)", code: `
      @grid: 4 / 100% _1px;
      @content: @i;
      
      @cell(even) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "@cell { }", code: `
      @grid: 4 / 100% _1px;
      @content: @i;
      
      @cell {
        background: #fff;
        color: #000;
      }
    ` },
  ],
});

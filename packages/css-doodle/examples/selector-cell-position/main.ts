// @cell tests x and y, and a pseudo after it applies to the matched cells
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "x = 2, y = 3", code: `
      @grid: 5x5 / 100% _1px;
      @content: @x, @y;
      
      @cell(x = 2, y = 3) {
        background: #fff;
        color: #000;
      }
      @cell(x = 4 && y = 4) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "x = y", code: `
      @grid: 5x5 / 100% _1px;
      @content: @x, @y;
      
      @cell(x = y) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "@cell(x = y)::after", code: `
      @grid: 5x5 / 100% _1px;
      
      @cell(x = y)::after {
        content: '';
        width: 50%;
        height: 50%;
        background: #e6437d;
        border-radius: 50%;
      }
    ` },
  ],
});

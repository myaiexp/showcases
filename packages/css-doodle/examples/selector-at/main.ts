// @at picks one cell by column and row, and @cell picks several
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@at(4, 3)", code: `
      @grid: 5 / 100% _1px;
      @content: @x, @y;
      
      @at(4, 3) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "@at not (4, 3)", code: `
      @grid: 5 / 100% _1px;
      @content: @x, @y;
      
      @at not (4, 3) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "@cell(x = 4 && y = 3, x = 2 && y = 2)", code: `
      @grid: 5 / 100% _1px;
      @content: @x, @y;
      
      @cell(x = 4 && y = 3, x = 2 && y = 2) {
        background: #fff;
        color: #000;
      }
    ` },
  ],
});

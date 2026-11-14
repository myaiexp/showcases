// @cell(random) picks cells by chance, by ratio or by exact count
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "random 3", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @cell(random 3) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "random", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @cell(random) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "random .2", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @cell(random .2) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "random 3, random 2", code: `
      @grid: 5x5 / 100% _1px;
      @content: @i;
      
      @cell(random 3, random 2) {
        background: #e6437d;
        color: #fff;
      }
    ` },
  ],
});

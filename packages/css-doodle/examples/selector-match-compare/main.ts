// @match picks cells for which an expression over x and y is true
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "x ≤ y", code: `
      @grid: 10 / 100% _1px;
      @content: @i;
      font-size: .5em;
      
      @match(x ≤ y) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "x = y, X - x + 1 == y", code: `
      @grid: 10 / 100% _1px;
      @content: @i;
      font-size: .5em;
      
      @match(x = y) {
        background: #fff;
        color: #000;
      }
      @match(X - x + 1 == y) {
        background: #e6437d;
        color: #fff;
      }
    ` },
    { label: "x ≠ y", code: `
      @grid: 10 / 100% _1px;
      @content: @i;
      font-size: .5em;
      
      @match(x ≠ y) {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "not (x > y)", code: `
      @grid: 10 / 100% _1px;
      @content: @i;
      font-size: .5em;
      
      @match not (x > y) {
        background: #e6437d;
        color: #fff;
      }
    ` },
  ],
});

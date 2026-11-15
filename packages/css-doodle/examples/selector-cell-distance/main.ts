// @cell with an expression over dr draws a disc and a ring
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "dr < 3", code: `
      @grid: 15 / 100%;
      @cell(dr < 3) {
        background: #fff;
      }
      @cell(dr > 5 && dr < 6) {
        background: #e6437d;
      }
    ` },
    { label: "dr < 5", code: `
      @grid: 15 / 100%;
      @cell(dr < 5) {
        background: #fff;
      }
      @cell(dr > 7 && dr < 8) {
        background: #e6437d;
      }
    ` },
    { label: "dr < 7", code: `
      @grid: 15 / 100%;
      @cell(dr < 7) {
        background: #fff;
      }
      @cell(dr > 9 && dr < 10) {
        background: #e6437d;
      }
    ` },
  ],
});

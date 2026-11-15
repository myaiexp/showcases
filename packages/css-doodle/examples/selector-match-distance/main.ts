// @match with dr, dm, dc and db draws rings, diamonds and borders
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "dr, dc, db", code: `
      @grid: 21 / 100%;
      
      @match(dr < 4) {
        background: #fff;
      }
      @match(dc = 7) {
        background: #e6437d;
      }
      @match(db = 0) {
        background: #fff;
      }
    ` },
    { label: "dm", code: `
      @grid: 21 / 100%;
      
      @match(dm < 4) {
        background: #fff;
      }
      @match(dm = 8) {
        background: #e6437d;
      }
    ` },
    { label: "dx, dy", code: `
      @grid: 21 / 100%;
      
      @match(dx = 0 || dy = 0) {
        background: #fff;
      }
      @match(abs(dx) = abs(dy)) {
        background: #e6437d;
      }
    ` },
  ],
});

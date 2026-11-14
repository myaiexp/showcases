// @match can use the angle from the centre, random numbers and custom properties
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "da", code: `
      @grid: 15 / 100%;
      
      @match(da > 0) {
        background: #e6437d;
      }
      @match(da <= 0) {
        background: #fff;
      }
    ` },
    { label: "random < .3", code: `
      @grid: 15 / 100% _1px;
      
      @match(random < .3) {
        background: #e6437d;
      }
    ` },
    { label: "--k: 3", code: `
      @grid: 15 / 100% _1px;
      --k: 3;
      
      @match(x % k = 0 || y % k = 0) {
        background: #fff;
      }
    ` },
  ],
});

// @even selects the cells where column plus row is odd, so rows alternate
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "5 × 5", code: `
      @grid: 5 / 100%;
      @content: @i;
      
      @even {
        background: #fff;
        color: #000;
        animation: p 1.6s ease-in-out infinite alternate;
        @keyframes p {
          to { scale: .6 }
        }
      }
    ` },
    { label: "4 × 4", code: `
      @grid: 4 / 100%;
      @content: @i;
      
      @even {
        background: #fff;
        color: #000;
        animation: p 1.6s ease-in-out infinite alternate;
        @keyframes p {
          to { scale: .6 }
        }
      }
    ` },
  ],
});

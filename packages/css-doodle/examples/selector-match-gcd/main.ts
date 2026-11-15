// @match(gcd(x-1, y-1) ≠ 1) draws a number-theory cover with a Math function
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    :doodle {
      @grid: 18 / 100% / #e14431 *x 180deg noclip;
      font-size: 4px;
      box-shadow:
        @m30(@n(*-.05em) @n(*.05em) 0 .1em #e14431);
      animation: h 8s linear infinite;
      @keyframes h {
        to { filter: hue-rotate(360deg) }
      }
    }
    @match(gcd(x-1, y-1) ≠ 1) {
      background: #fff;
      z-index: @I(-@i);
      margin: -.125em 0 0 -.125em;
      box-shadow:
        inset 0 0 0 .25em #000,
        @m27(@n(*-.05em) @n(*-.05em) 0 .1em #000);
    }
  `,
});

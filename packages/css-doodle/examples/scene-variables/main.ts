// Named rows are variables: k: .3 and c: #f06
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      k: .28;
      c: #ff6b6b;
      sphere { r: k; fill: c }
      torus { r: 2k k * .3; fill: c }
      torus { r: 3k k * .3; rotate: x 90; fill: c }
      view: 40t 20;
    );
  `,
  say: "A name that nothing reads is reported, which finds typos",
});

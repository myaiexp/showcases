// @random rules draw independently: borders and bars land on different cells
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 16 / 100%;
    
    @random {
      border-top: 1px solid #fff;
    }
    @random {
      border-left: 1px solid #fff;
    }
    @random(.2) {
      background:
        linear-gradient(#e6437d, #e6437d)
        50% 50% / @r(80%) @lr
        no-repeat;
    }
  `,
  reroll: true,
});

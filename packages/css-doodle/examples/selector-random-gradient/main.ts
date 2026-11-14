// the probability is an expression: it grows towards the bottom of the grid
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 24 / 100% _1px;
    
    @random((y - 1) / Y) {
      background: #e6437d;
    }
  `,
  reroll: true,
});

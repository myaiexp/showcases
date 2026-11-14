// @place takes points from @plot: twenty-four cells on a circle
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 24x1 / 100%;
    :container {
      rotate: @t(*20deg);
    }
    @size: 8%;
    @place: @plot(r: .8);
    border-radius: 50%;
    background: #e6437d;
  `,
});

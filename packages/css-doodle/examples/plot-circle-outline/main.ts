// Plot cells along an outline
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 24x1 / 100%;
      @size: 8%;
      border-radius: 50%;
      background: #000;
      @place: @plot(r: .8);
    `,
});

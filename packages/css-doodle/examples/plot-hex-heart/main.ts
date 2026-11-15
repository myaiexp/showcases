// Honeycomb points in a shape
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 120x1 / 100%;
      @size: 5%;
      border-radius: 50%;
      background: #e6437d;
      @place: @plot.hex(heart; scale: .9);
    `,
});

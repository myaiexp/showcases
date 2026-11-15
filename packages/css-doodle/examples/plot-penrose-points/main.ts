// Penrose points
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 300x1 / 100%;
      @size: 3%;
      border-radius: 50%;
      background: #e9c46a;
      @place: @plot.penrose(circle; scale: .95);
    `,
});

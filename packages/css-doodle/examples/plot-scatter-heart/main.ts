// Scatter points inside a shape
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 120x1 / 100%;
      @size: 4%;
      border-radius: 50%;
      background: #e6437d;
      @place: @plot.scatter(heart; scale: .9);
    `,
    reroll: true,
});

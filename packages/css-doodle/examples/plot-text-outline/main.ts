// Cells along a letter's outline
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 120x1 / 100%;
      @size: 3%;
      border-radius: 50%;
      background: #f4a261;
      @place: @plot(
        text: S;
        font: 900 sans-serif;
        scale: .85;
      );
    `,
});

// Contours share the cells
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 100%;
      @size: 4%;
      border-radius: 50%;
      background: #9d4edd;
      @place: @plot(r: .9, .5);
    `,
});

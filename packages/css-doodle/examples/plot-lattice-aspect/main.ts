// Aspect for a wide frame
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 160x1 / 100% 56%;
      @size: 3%;
      border-radius: 50%;
      background: #e6437d;
      @place: @plot.hex(
        circle;
        aspect: 16 / 9;
      );
    `,
    frame: 'wide',
});

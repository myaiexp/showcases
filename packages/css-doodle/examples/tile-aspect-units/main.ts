// Pieces keep their shape in a wide doodle
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 60x1 / 12rem 6rem / #3b2410;
      background: hsl(@r(34, 44) 92% @r(52, 64)%);
      clip-path: @tile.hex(gap: 1.2);
    `,
    frame: 'wide',
});

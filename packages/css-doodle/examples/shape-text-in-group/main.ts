// Letters in a group
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        union {
          shape { text: A; font: 900 serif; scale: .45; move: -.55 0 }
          shape { text: B; font: 900 serif; scale: .45; move: 0 0 }
          shape { text: C; font: 900 serif; scale: .45; move: .55 0 }
        }
      );
    `,
});

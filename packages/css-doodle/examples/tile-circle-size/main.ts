// Limiting circle size with size
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "size: .2 + d * 6",
        code: `
            @grid: 200x1 / 100%;
            background: #000;
            clip-path: @tile.circle(size: .2 + d * 6; gap: .4);
        `,
      },
      {
        label: "size: 1",
        code: `
            @grid: 200x1 / 100%;
            background: #000;
            clip-path: @tile.circle(size: 1; gap: .4);
        `,
      },
    ],
});

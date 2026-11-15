// The point index i
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "i % 2",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 24;
              r: 1 - .4 * (i % 2);
              scale: .9;
            );
        `,
      },
      {
        label: "i % 3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 24;
              r: 1 - .4 * (i % 3) / 2;
              scale: .9;
            );
        `,
      },
      {
        label: "i * .04",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 24;
              r: .1 + i * .04;
              scale: .9;
            );
        `,
      },
    ],
});

// Turning cells with dir
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "dir: auto",
        code: `
            @grid: 12x1 / 100%;
            @size: 15% 20%;
            background: #000;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            @place: @plot(
              r: .8;
              dir: auto
            );
        `,
      },
      {
        label: "dir: reverse",
        code: `
            @grid: 12x1 / 100%;
            @size: 15% 20%;
            background: #000;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            @place: @plot(
              r: .8;
              dir: reverse
            );
        `,
      },
      {
        label: "dir: auto 90deg",
        code: `
            @grid: 12x1 / 100%;
            @size: 15% 20%;
            background: #000;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            @place: @plot(
              r: .8;
              dir: auto 90deg
            );
        `,
      },
      {
        label: "dir: 0",
        code: `
            @grid: 12x1 / 100%;
            @size: 15% 20%;
            background: #000;
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            @place: @plot(
              r: .8;
              dir: 0
            );
        `,
      },
    ],
});

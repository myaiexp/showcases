// Polar points: a hexagon
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "points: 3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 3;
              scale: .8;
            );
        `,
      },
      {
        label: "points: 4",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 4;
              scale: .8;
            );
        `,
      },
      {
        label: "points: 5",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 5;
              scale: .8;
            );
        `,
      },
      {
        label: "points: 6",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 6;
              scale: .8;
            );
        `,
      },
      {
        label: "points: 8",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 8;
              scale: .8;
            );
        `,
      },
    ],
    say: "@shape(points: 6; scale: .8) is a hexagon",
});

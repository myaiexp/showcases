// A bare circle versus a circle with commands
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "circle",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle
            );
        `,
      },
      {
        label: "circle; points: 180",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle; points: 180
            );
        `,
      },
      {
        label: "circle; points: 7",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              circle; points: 7
            );
        `,
      },
    ],
    say: "ellipse(50% 50%) or a polygon, depending on whether commands follow",
});

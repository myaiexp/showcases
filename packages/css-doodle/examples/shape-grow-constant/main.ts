// Grow by a length
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "grow: -0.2",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .5;
              grow: -0.2
            );
        `,
      },
      {
        label: "grow: 0",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .5;
              grow: 0
            );
        `,
      },
      {
        label: "grow: 0.1",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .5;
              grow: 0.1
            );
        `,
      },
      {
        label: "grow: 0.25",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              scale: .5;
              grow: 0.25
            );
        `,
      },
    ],
});

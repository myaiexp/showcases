// The seed command
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "seed: 1",
        code: `
            @grid: 2 / 100% _2px;
            background: #000;
            clip-path: @shape(
              points: 200;
              r: @R.t(.5, 1);
              seed: 1;
            );
        `,
      },
      {
        label: "seed: 2",
        code: `
            @grid: 2 / 100% _2px;
            background: #000;
            clip-path: @shape(
              points: 200;
              r: @R.t(.5, 1);
              seed: 2;
            );
        `,
      },
      {
        label: "seed: 3",
        code: `
            @grid: 2 / 100% _2px;
            background: #000;
            clip-path: @shape(
              points: 200;
              r: @R.t(.5, 1);
              seed: 3;
            );
        `,
      },
      {
        label: "seed: 4",
        code: `
            @grid: 2 / 100% _2px;
            background: #000;
            clip-path: @shape(
              points: 200;
              r: @R.t(.5, 1);
              seed: 4;
            );
        `,
      },
    ],
});

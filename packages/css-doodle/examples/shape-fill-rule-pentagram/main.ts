// Fill rule of a pentagram
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "nonzero",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 5;
              turn: 2;
              rotate: 90;
            );
        `,
      },
      {
        label: "evenodd",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 5;
              turn: 2;
              rotate: 90;
              fill-rule: evenodd;
            );
        `,
      },
    ],
});

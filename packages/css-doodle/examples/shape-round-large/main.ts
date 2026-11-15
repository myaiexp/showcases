// A large radius leaves no straight side
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "round: 0",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              round: 0;
              scale: .9
            );
        `,
      },
      {
        label: "round: 0.3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              round: 0.3;
              scale: .9
            );
        `,
      },
      {
        label: "round: 0.6",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              round: 0.6;
              scale: .9
            );
        `,
      },
      {
        label: "round: 1",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square;
              round: 1;
              scale: .9
            );
        `,
      },
    ],
});

// Jitter on a lattice
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "jitter: 0",
        code: `
            @grid: 120x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e76f51;
            @place: @plot.hex(circle; scale: .9; jitter: 0);
        `,
      },
      {
        label: "jitter: 0.15",
        code: `
            @grid: 120x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e76f51;
            @place: @plot.hex(circle; scale: .9; jitter: 0.15);
        `,
      },
      {
        label: "jitter: 0.3",
        code: `
            @grid: 120x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #e76f51;
            @place: @plot.hex(circle; scale: .9; jitter: 0.3);
        `,
      },
    ],
    reroll: true,
});

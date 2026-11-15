// Square lattice points
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "grid",
        code: `
            @grid: 150x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #2a9d8f;
            @place: @plot.grid(circle; scale: .9);
        `,
      },
      {
        label: "shift: .5",
        code: `
            @grid: 150x1 / 100%;
            @size: 4%;
            border-radius: 50%;
            background: #2a9d8f;
            @place: @plot.grid(circle; scale: .9; shift: .5);
        `,
      },
    ],
});

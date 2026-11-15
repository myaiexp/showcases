// Honeycomb corners with op: d
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "centres",
        code: `
            @grid: 150x1 / 100%;
            @size: 3%;
            border-radius: 50%;
            background: #2a9d8f;
            @place: @plot.hex(circle; scale: .9);
        `,
      },
      {
        label: "op: d",
        code: `
            @grid: 150x1 / 100%;
            @size: 3%;
            border-radius: 50%;
            background: #2a9d8f;
            @place: @plot.hex(circle; scale: .9; op: d);
        `,
      },
    ],
});

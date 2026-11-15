// Density and relax of a scatter
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "even",
        code: `
            @grid: 150x1 / 100%;
            @size: 3%;
            border-radius: 50%;
            background: #000;
            @place: @plot.scatter(circle; scale: .9);
        `,
      },
      {
        label: "density: 1 - y",
        code: `
            @grid: 150x1 / 100%;
            @size: 3%;
            border-radius: 50%;
            background: #000;
            @place: @plot.scatter(circle; scale: .9; density: 1 - y);
        `,
      },
      {
        label: "relax: 0",
        code: `
            @grid: 150x1 / 100%;
            @size: 3%;
            border-radius: 50%;
            background: #000;
            @place: @plot.scatter(circle; scale: .9; relax: 0);
        `,
      },
      {
        label: "relax: 40",
        code: `
            @grid: 150x1 / 100%;
            @size: 3%;
            border-radius: 50%;
            background: #000;
            @place: @plot.scatter(circle; scale: .9; relax: 40);
        `,
      },
    ],
});

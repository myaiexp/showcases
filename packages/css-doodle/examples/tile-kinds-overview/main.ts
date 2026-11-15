// Every kind on the same square
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "@tile.slice",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.slice(gap: .8);
        `,
      },
      {
        label: "@tile.voronoi",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.voronoi(gap: .8);
        `,
      },
      {
        label: "@tile.delaunay",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.delaunay(gap: .8);
        `,
      },
      {
        label: "@tile.grid",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.grid(gap: .8);
        `,
      },
      {
        label: "@tile.hex",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.hex(gap: .8);
        `,
      },
      {
        label: "@tile.triangle",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.triangle(gap: .8);
        `,
      },
      {
        label: "@tile.cube",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.cube(gap: .8);
        `,
      },
      {
        label: "@tile.penrose",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.penrose(gap: .8);
        `,
      },
      {
        label: "@tile.circle",
        code: `
            @grid: 30x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.circle(gap: .8);
        `,
      },
    ],
    say: "@tile on its own is @tile.slice",
});

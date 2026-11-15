// Each operator letter on a hex
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "op: d",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: d; gap: .6);
        `,
      },
      {
        label: "op: a",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: a; gap: .6);
        `,
      },
      {
        label: "op: t",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: t; gap: .6);
        `,
      },
      {
        label: "op: k",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: k; gap: .6);
        `,
      },
      {
        label: "op: e",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: e; gap: .6);
        `,
      },
      {
        label: "op: b",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: b; gap: .6);
        `,
      },
      {
        label: "op: s",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: s; gap: .6);
        `,
      },
      {
        label: "op: g",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: g; gap: .6);
        `,
      },
      {
        label: "op: j",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: j; gap: .6);
        `,
      },
      {
        label: "op: m",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: m; gap: .6);
        `,
      },
      {
        label: "op: o",
        code: `
            @grid: 60x1 / 100% / #222;
            background: @match(@tile.k == 1, #ebbf4d, @tile.k == 2, #e6437d, #fff);
            clip-path: @tile.hex(op: o; gap: .6);
        `,
      },
    ],
});

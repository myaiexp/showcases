// @pn.cycle walks the rotations in order
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "spaces", code: `
      @grid: 1x4 / 100% _2px;
      @content: @pn.cycle(1 2 3 4);
      background: #000;
      color: #fff;
      font-size: 1.5em;
    ` },
      { label: "commas", code: `
      @grid: 1x4 / 100% _2px;
      @content: @pn.cycle(1, 2, 3, 4);
      background: #000;
      color: #fff;
      font-size: 1.5em;
    ` },
    ],
    say: "@pn.cycle(…) steps through the rotations, one per cell",
});

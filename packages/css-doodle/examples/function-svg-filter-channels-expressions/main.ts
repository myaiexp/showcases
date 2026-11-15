// channels take sums such as 1 - r and .5g + .2
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "none", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, #e6437d, #ebbf4d, #3b82f6);
    ` },
      { label: "r: 1 - r", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, #e6437d, #ebbf4d, #3b82f6);
      filter: @svg-filter(channels { r: 1 - r; });
    ` },
      { label: "g: .5g + .2", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, #e6437d, #ebbf4d, #3b82f6);
      filter: @svg-filter(channels { g: .5g + .2; });
    ` },
      { label: "b: 2 * b", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, #e6437d, #ebbf4d, #3b82f6);
      filter: @svg-filter(channels { b: 2 * b; });
    ` },
      { label: "r, g, b: gray", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, #e6437d, #ebbf4d, #3b82f6);
      filter: @svg-filter(channels { r: .3r + .6g + .1b; g: .3r + .6g + .1b; b: .3r + .6g + .1b; });
    ` },
    ],
    say: "Channels not listed stay unchanged",
});

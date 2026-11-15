// region: sets how far a filter draws outside
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "default", code: `
      @grid: 1 / 100%;
      @size: 60%;
      margin: auto;
      background: #000;
      filter: @svg-filter(frequency: .03; scale: 140);
    ` },
      { label: "region: 0 0 / 100% 100%", code: `
      @grid: 1 / 100%;
      @size: 60%;
      margin: auto;
      background: #000;
      filter: @svg-filter(region: 0 0 / 100% 100%; frequency: .03; scale: 140);
    ` },
      { label: "region: 40%", code: `
      @grid: 1 / 100%;
      @size: 60%;
      margin: auto;
      background: #000;
      filter: @svg-filter(region: 40%; frequency: .03; scale: 140);
    ` },
    ],
    say: "region: 20% is the default for the short names",
});

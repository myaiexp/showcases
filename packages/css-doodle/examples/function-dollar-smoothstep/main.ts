// smoothstep() inside $() eases a scale
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "0, 5", code: `
      @grid: 9 / 100% _1px;
      background: #000;
      border-radius: 50%;
      scale: $(1 - smoothstep(0, 5, @dr));
    ` },
      { label: "0, 3", code: `
      @grid: 9 / 100% _1px;
      background: #000;
      border-radius: 50%;
      scale: $(1 - smoothstep(0, 3, @dr));
    ` },
      { label: "2, 6", code: `
      @grid: 9 / 100% _1px;
      background: #000;
      border-radius: 50%;
      scale: $(1 - smoothstep(2, 6, @dr));
    ` },
    ],
    say: "scale: $(1 - smoothstep(0, 5, @dr))",
});

// Stripes without a size share the space left over
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "60% 30% rest", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, @stripe(gold 60%, orange 30%, crimson));
    ` },
      { label: "no sizes", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, @stripe(gold, orange, crimson));
    ` },
      { label: "20% rest 50%", code: `
      @grid: 1 / 100%;
      background: linear-gradient(90deg, @stripe(gold 20%, orange, crimson 50%));
    ` },
    ],
    say: "Sized stripes first, then the leftover is shared",
});

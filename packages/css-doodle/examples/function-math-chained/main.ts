// $(abs.sin(@i)) is $(abs(sin(@i)))
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "abs.sin", code: `
      @grid: 10 / 100% _1px;
      background: #000;
      opacity: $(abs.sin(@i));
    ` },
      { label: "abs.cos", code: `
      @grid: 10 / 100% _1px;
      background: #000;
      opacity: $(abs.cos(@i / 3));
    ` },
      { label: "sqrt.abs.sin", code: `
      @grid: 10 / 100% _1px;
      background: #000;
      opacity: $(sqrt.abs.sin(@i));
    ` },
    ],
    say: "opacity: $(abs.sin(@i))",
});

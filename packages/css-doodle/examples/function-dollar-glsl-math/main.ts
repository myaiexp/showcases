// mod, fract, clamp, mix and step inside $()
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "mod", code: `
      @grid: 12x1 / 100%;
      background: #000;
      align-self: end;
      height: $%(mod(i, 4) * 30 + 10);
    ` },
      { label: "fract", code: `
      @grid: 12x1 / 100%;
      background: #000;
      align-self: end;
      height: $%(fract(i / 5) * 90 + 10);
    ` },
      { label: "clamp", code: `
      @grid: 12x1 / 100%;
      background: #000;
      align-self: end;
      height: $%(clamp(i * 12, 20, 80));
    ` },
      { label: "mix", code: `
      @grid: 12x1 / 100%;
      background: #000;
      align-self: end;
      height: $%(mix(10, 100, i / 12));
    ` },
      { label: "step", code: `
      @grid: 12x1 / 100%;
      background: #000;
      align-self: end;
      height: $%(30 + 60 * step(6, i));
    ` },
    ],
    say: "height: $%(…) with one helper at a time",
});

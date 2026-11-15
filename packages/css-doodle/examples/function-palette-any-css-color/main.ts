// @palette around tomato, oklch() and other colors
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "tomato", code: `
      @grid: 6x1 / 100%;
      background: @pn(@palette(6, tomato));
    ` },
      { label: "oklch(70% .12 250)", code: `
      @grid: 6x1 / 100%;
      background: @pn(@palette(6, oklch(70% .12 250)));
    ` },
      { label: "seagreen", code: `
      @grid: 6x1 / 100%;
      background: @pn(@palette(6, seagreen));
    ` },
    ],
    attrs: {"seed":"base"},
    say: "The base color is second in the list",
});

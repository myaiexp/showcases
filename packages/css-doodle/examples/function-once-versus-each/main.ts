// The same random hue, drawn once and drawn per cell
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "@r(360)", code: `
      @grid: 5 / 100% _1px;
      background: hsl(@r(360), 70%, @r(30%, 80%));
    ` },
      { label: "@once(@r(360))", code: `
      @grid: 5 / 100% _1px;
      background: hsl(@once(@r(360)), 70%, @r(30%, 80%));
    ` },
    ],
    reroll: true,
    say: "Each call site caches its own value for one render",
});

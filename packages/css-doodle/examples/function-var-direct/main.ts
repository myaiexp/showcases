// In code written in the element, var() just works
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _1px;
      --bg: #000;
      background: linear-gradient(
        @r(360deg),
        var(--bg) 50%, #0000 0
      );
    `,
    reroll: true,
    say: "var(--bg) needs no @var here",
});

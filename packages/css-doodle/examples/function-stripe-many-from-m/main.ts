// @stripe.@m40.@p composes into forty random bands
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: radial-gradient(
        @stripe.@m40.@p(#000, #e6437d, #ebbf4d)
      );
    `,
    reroll: true,
    say: "@stripe.@m40.@p(…) is @stripe(@m40(@p(…)))",
});

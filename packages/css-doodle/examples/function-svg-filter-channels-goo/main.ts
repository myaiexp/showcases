// blur then channels { a: 20a - 8 } melts touching shapes
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 6 / 100%;
      @size: @r(40%, 90%);
      background: #000;
      border-radius: 50%;
      transform: translate(@r(-40%, 40%), @r(-40%, 40%));
      :container {
        filter: @svg-filter(
          blur: 6;
          channels { a: 20a - 8; }
        );
      }
    `,
    reroll: true,
    say: "blur: 6; channels { a: 20a - 8; }",
});

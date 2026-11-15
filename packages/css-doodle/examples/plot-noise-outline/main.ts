// A wobbly outline from @R.t
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 48x1 / 100%;
      @size: 5%;
      border-radius: 50%;
      background: #2a9d8f;
      @place: @plot(r: @R.t(.5, .9));
    `,
    reroll: true,
});

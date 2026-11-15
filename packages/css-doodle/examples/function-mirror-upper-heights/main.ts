// @pn.Mirror makes a bar chart that rises and falls
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 9x1 / 100%;
      background: #000;
      align-self: center;
      height: @pn.Mirror(20%, 40%, 60%, 80%, 100%);
    `,
    say: "@pn.Mirror(…): 20 40 60 80 100 80 60 40 20",
});

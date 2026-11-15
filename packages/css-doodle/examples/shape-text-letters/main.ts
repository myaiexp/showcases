// Letters traced into an outline
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 4 / 100% _2px;
      background: #000;
      clip-path: @shape(
        text: @p([A-Z]);
        font: 900 serif;
        scale: .8;
      );
      transition: .5s;
    `,
    reroll: true,
});

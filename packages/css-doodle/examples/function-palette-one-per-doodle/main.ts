// :doodle and the cells share one palette
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 12 / 100%;
      :doodle {
        background: @palette(1);
      }
      margin: 15%;
      border-radius: 50%;
      background: @p(@palette(4));
    `,
    reroll: true,
    say: ":doodle takes the ground; the cells pick from four colors",
});

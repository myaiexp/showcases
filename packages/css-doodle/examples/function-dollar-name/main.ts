// $ink and $n read custom properties by name
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 5 / 100% _1px;
      --ink: @p(#000, #e6437d);
      --n: @i * @i;
      background: $ink;
      color: #fff;
      @content: $n;
    `,
    reroll: true,
    say: "background: $ink; @content: $n",
});

// --fill(c, r): { ... } pastes a block of properties
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "circles and squares", code: `
      @grid: 7 / 100% _2px;
      --fill(c, r): {
        background: $c;
        border-radius: $r;
      }
      @even { $fill(#000, 50%) }
      @odd { $fill(#e6437d, 10%) }
    ` },
      { label: "other arguments", code: `
      @grid: 7 / 100% _2px;
      --fill(c, r): {
        background: $c;
        border-radius: $r;
      }
      @even { $fill(#ebbf4d, 0) }
      @odd { $fill(#000, 50% 0) }
    ` },
    ],
    say: "@even { $fill(#000, 50%) } @odd { $fill(#e6437d, 10%) }",
});

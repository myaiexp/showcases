// --dot(r, c = #000) is called as $dot(30%)
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "two dots", code: `
      @grid: 6 / 100% _2px;
      --dot(r, c = #000): radial-gradient($c $r, #0000 0);
      background: $dot(30%), $dot(60%, #e6437d);
    ` },
      { label: "three dots", code: `
      @grid: 6 / 100% _2px;
      --dot(r, c = #000): radial-gradient($c $r, #0000 0);
      background: $dot(20%), $dot(40%, #e6437d), $dot(60%, #ebbf4d);
    ` },
      { label: "random color", code: `
      @grid: 6 / 100% _2px;
      --dot(r, c = #000): radial-gradient($c $r, #0000 0);
      background: $dot(55%, @p(#000, #e6437d, #ebbf4d));
    ` },
    ],
    say: "--dot(r, c = #000): …  then $dot(30%), $dot(60%, #e6437d)",
});

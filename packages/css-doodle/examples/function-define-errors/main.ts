// Missing arguments and recursion produce warnings
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "valid", code: `
      @grid: 4 / 100% _1px;
      --tint(c, a = 1): rgb(from $c r g b / $a);
      background: $tint(tomato, .6);
    ` },
      { label: "missing argument", code: `
      @grid: 4 / 100% _1px;
      --tint(c, a): rgb(from $c r g b / $a);
      background: $tint(tomato);
    ` },
      { label: "calls itself", code: `
      @grid: 4 / 100% _1px;
      --loop(x): $loop(x);
      background: #000;
      @content: $loop(1);
    ` },
    ],
    say: "The broken calls expand to nothing; the warning names the problem",
});

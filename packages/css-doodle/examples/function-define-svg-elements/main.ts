// A definition inside @svg holds elements
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "three dots", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -10 -10 20 20;
        --dot(r, c = #000): circle { r: $r; fill: $c }
        $dot(8) $dot(5, #e6437d) $dot(2)
      );
    ` },
      { label: "four dots", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -10 -10 20 20;
        --dot(r, c = #000): circle { r: $r; fill: $c }
        $dot(9) $dot(7, #e6437d) $dot(5, #ebbf4d) $dot(3)
      );
    ` },
    ],
    say: "--dot(r, c = #000): circle { r: $r; fill: $c }",
});

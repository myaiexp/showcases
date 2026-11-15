// @sin(30deg) is 0; radians(30) is the fix
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@sin(30deg)", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @sin(30deg);
    ` },
      { label: "@sin(radians(30))", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: @sin(radians(30));
    ` },
      { label: "$(sin(30deg))", code: `
      @grid: 1 / 100%;
      background: #000;
      color: #fff;
      font-size: 1.4em;
      @content: $(sin(30deg));
    ` },
    ],
    say: "Radians for @ functions, angles only inside $()",
});

// @raw(<b>@i</b>) fills HTML with cell values
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "@i", code: `
      @grid: 3 / 100% _1px;
      background: #000;
      @content: @raw(<b>@i</b>);
      b {
        color: #fff;
        font-size: 2em;
      }
    ` },
      { label: "@x,@y", code: `
      @grid: 3 / 100% _1px;
      background: #000;
      @content: @raw(<b>@x,@y</b>);
      b {
        color: #ebbf4d;
        font-size: 1.4em;
      }
    ` },
      { label: "commas", code: `
      @grid: 3 / 100% _1px;
      background: #000;
      @content: @raw(<b>A, B</b>);
      b {
        color: #e6437d;
        font-size: 1.4em;
      }
    ` },
    ],
    say: "The markup is kept, the functions are filled in",
});

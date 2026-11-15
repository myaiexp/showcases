// @random picks cells with a probability, or an exact number of them
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "@random", code: `
      @grid: 5 / 100% _1px;
      @content: @i;
      transition: .4s;
      
      @random {
        background: #fff;
        color: #000;
      }
    ` },
    { label: "@random(2)", code: `
      @grid: 5 / 100% _1px;
      @content: @i;
      transition: .4s;
      
      @random(2) {
        background: #fff;
        color: #000;
      }
    ` },
  ],
  reroll: true,
});

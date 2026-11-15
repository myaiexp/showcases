// lathe with points: a profile turned into a goblet
import { simple } from '../../shared/a-kit.ts';

export default simple({
  code: `
    @grid: 1 / 100%;
    @content: @scene(
      lathe {
        points: 0 -1, .5 -1, .5 -.9, .08 -.8, .08 -.1, .5 .2, .55 .8, .45 .8, .4 .3, 0 .1;
        fill: #e9c46a;
      }
      view: 0 20;
    );
  `,
  say: "x is the radius, y the height",
});

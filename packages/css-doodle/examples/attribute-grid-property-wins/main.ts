// Both doodles carry grid="2"; the @grid property overrides it
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "grid=\"2\"", code: `
      :doodle {
        @size: 100%;
        gap: 2px;
      }
      background: #e6437d;
      color: #fff;
      @content: @pn([a-z]);
      scale: @r(.7, 1);
      transition: .5s;
    ` },
    { label: "+ @grid: 5x5", code: `
      /* the property overrides the attribute */
      @grid: 5x5 / 100% _2px;
      background: #e6437d;
      color: #fff;
      @content: @pn([a-z]);
      scale: @r(.7, 1);
      transition: .5s;
    ` },
  ],
  attrs: {"grid":"2"},
  reroll: true,
});

// @size sizes every cell, or the component on :doodle, with an optional ratio
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "@size: 10em", code: `
      @grid: 1 / 100%;
      @size: 10em;
      background: #e6437d;
    ` },
    { label: "@size: 10em 6em", code: `
      @grid: 1 / 100%;
      @size: 10em 6em;
      background: #e6437d;
    ` },
    { label: "random, auto 3/2", code: `
      @grid: 5 / 100% _1px;
      @size: @r(30%, 90%) auto 3/2;
      margin: auto;
      background: #e6437d;
    ` },
    { label: ":doodle { @size }", code: `
      :doodle {
        @grid: 3 / 100%;
        @size: 60% 40%;
      }
      background: #e6437d;
      margin: 1px;
    ` },
  ],
  boxed: true,
});

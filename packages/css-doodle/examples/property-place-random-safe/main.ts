// @place with @r scatters cells; safe keeps them inside the container
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "default", code: `
      @grid: 30x1 / 100%;
      @size: @r(5%, 20%);
      @place: @r(100%) @r(100%);
      border-radius: 50%;
      background: @p(#fff, #e6437d, #ebbf4d);
      opacity: @r(.3, 1);
      :doodle {
        contain: none;
      }
    ` },
    { label: "safe", code: `
      @grid: 30x1 / 100%;
      @size: @r(5%, 20%);
      @place: safe @r(100%) @r(100%);
      border-radius: 50%;
      background: @p(#fff, #e6437d, #ebbf4d);
      opacity: @r(.3, 1);
      :doodle {
        contain: none;
      }
    ` },
  ],
  reroll: true,
});

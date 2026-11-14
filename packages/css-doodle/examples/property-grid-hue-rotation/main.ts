// the *h modifier of @grid applies hue-rotate() to the whole component
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "*h 0deg", code: `
      @grid: 5 / 100% _2px *h 0deg;
      background: #e6437d;
      :doodle {
        transition: filter .8s;
      }
    ` },
    { label: "*h 60deg", code: `
      @grid: 5 / 100% _2px *h 60deg;
      background: #e6437d;
      :doodle {
        transition: filter .8s;
      }
    ` },
    { label: "*h 120deg", code: `
      @grid: 5 / 100% _2px *h 120deg;
      background: #e6437d;
      :doodle {
        transition: filter .8s;
      }
    ` },
    { label: "*h 200deg", code: `
      @grid: 5 / 100% _2px *h 200deg;
      background: #e6437d;
      :doodle {
        transition: filter .8s;
      }
    ` },
    { label: "*h 300deg", code: `
      @grid: 5 / 100% _2px *h 300deg;
      background: #e6437d;
      :doodle {
        transition: filter .8s;
      }
    ` },
  ],
});

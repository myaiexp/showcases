// the + ~ and ^ modifiers of @grid transform the container
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "+1.2", code: `
      @grid: 8 / 100% ß1 _2px +1.2;
      background: #e6437d;
    ` },
    { label: "+.7", code: `
      @grid: 8 / 100% ß1 _2px +.7;
      background: #e6437d;
    ` },
    { label: "~ 20% 20%", code: `
      @grid: 5 / 100% ß1 _2px ~ 20% 20%;
      background: #e6437d;
    ` },
    { label: "^1.2", code: `
      @grid: 8 / 100% ß1 _1px ^1.2;
      background: #e6437d;
    ` },
    { label: "^-30px", code: `
      @grid: 8 / 100% ß1 _1px ^-30px;
      background: #e6437d;
    ` },
    { label: "^1.4 .6", code: `
      @grid: 8 / 100% ß1 _1px ^1.4 .6;
      background: #e6437d;
    ` },
  ],
});

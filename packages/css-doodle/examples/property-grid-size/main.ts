// the first / of @grid sizes the component, with an aspect ratio for auto
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "/ 100%", code: `
      @grid: 4x4 / 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "/ 60% 100%", code: `
      @grid: 4x4 / 60% 100%;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "/ 100% auto", code: `
      @grid: 5x4 / 100% auto;
      background: #e6437d;
      margin: 1px;
    ` },
    { label: "/ 70% auto (5/4)", code: `
      @grid: 3x5 / 70% auto (5/4);
      background: #e6437d;
      margin: 1px;
    ` },
  ],
  boxed: true,
  say: "Dashed line: the space the doodle sits in",
});

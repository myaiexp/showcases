// the | modifier of @grid puts a backdrop-filter layer above the cells
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "blur + contrast", code: `
      @grid: 6 / 100% / #fff _4px | blur(3px) contrast(20);
      background: #000;
      border-radius: 50%;
      scale: @r(.5, 1.2);
    ` },
    { label: "@svg-filter", code: `
      @grid: 4 / 100% / #fff ^.85 _10px | @svg-filter(.015, 50);
      border-radius: 50%;
      background: #000;
    ` },
  ],
});

// viewbox, LINEARGRADIENT and the usual spellings
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "viewBox", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        circle { cx, cy: 5; r: 4; fill: linearGradient { stop { offset: 0; stop-color: #e6437d } stop { offset: 1; stop-color: #000 } } }
      );
    ` },
      { label: "viewbox", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewbox: 10;
        circle { cx, cy: 5; r: 4; fill: lineargradient { stop { offset: 0; stop-color: #e6437d } stop { offset: 1; stop-color: #000 } } }
      );
    ` },
      { label: "VIEWBOX", code: `
      @grid: 1 / 100%;
      background: @svg(
        VIEWBOX: 10;
        CIRCLE { CX, CY: 5; R: 4; FILL: LINEARGRADIENT { STOP { OFFSET: 0; STOP-COLOR: #e6437d } STOP { OFFSET: 1; STOP-COLOR: #000 } } }
      );
    ` },
    ],
    say: "Three spellings, one picture",
});

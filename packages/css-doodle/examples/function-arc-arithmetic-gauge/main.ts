// to: 360 * .7 makes a gauge
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "25%", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        path { d: @arc(r: 38; at: 50 50); stroke: #ddd }
        path { d: @arc(r: 38; at: 50 50; from: -90; to: -90 + 360 * 0.25); stroke: #e6437d }
      );
    ` },
      { label: "50%", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        path { d: @arc(r: 38; at: 50 50); stroke: #ddd }
        path { d: @arc(r: 38; at: 50 50; from: -90; to: -90 + 360 * 0.5); stroke: #e6437d }
      );
    ` },
      { label: "70%", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        path { d: @arc(r: 38; at: 50 50); stroke: #ddd }
        path { d: @arc(r: 38; at: 50 50; from: -90; to: -90 + 360 * 0.7); stroke: #e6437d }
      );
    ` },
      { label: "90%", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        path { d: @arc(r: 38; at: 50 50); stroke: #ddd }
        path { d: @arc(r: 38; at: 50 50; from: -90; to: -90 + 360 * 0.9); stroke: #e6437d }
      );
    ` },
    ],
    say: "from: -90; to: -90 + 360 * .7",
});

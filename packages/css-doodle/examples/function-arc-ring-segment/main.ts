// Two arcs drawn back the other way make a ring piece
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "r 44 / 24", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -50 -50 100 100;
        path {
          d: @arc(r: 44; from: -150; to: -30)
             @arc(r: 24; from: -30; to: -150) Z;
          fill: #000;
        }
      );
    ` },
      { label: "thin", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -50 -50 100 100;
        path {
          d: @arc(r: 44; from: -150; to: -30)
             @arc(r: 38; from: -30; to: -150) Z;
          fill: #000;
        }
      );
    ` },
      { label: "wide span", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -50 -50 100 100;
        path {
          d: @arc(r: 44; from: -200; to: 20)
             @arc(r: 24; from: 20; to: -200) Z;
          fill: #e6437d;
        }
      );
    ` },
    ],
    say: "@arc(r: 44; from: -150; to: -30) @arc(r: 24; from: -30; to: -150) Z",
});

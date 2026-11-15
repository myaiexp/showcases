// feTurbulence and feDisplacementMap as a body
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: ".01 .5", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(
        feTurbulence {
          type: fractalNoise;
          baseFrequency: .01 .5;
        }
        feDisplacementMap {
          in: SourceGraphic;
          scale: 50;
        }
      );
    ` },
      { label: ".5 .01", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(
        feTurbulence {
          type: fractalNoise;
          baseFrequency: .5 .01;
        }
        feDisplacementMap {
          in: SourceGraphic;
          scale: 50;
        }
      );
    ` },
      { label: ".03", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(
        feTurbulence {
          type: fractalNoise;
          baseFrequency: .03;
        }
        feDisplacementMap {
          in: SourceGraphic;
          scale: 50;
        }
      );
    ` },
    ],
    say: "Any filter can be written as elements and attributes",
});

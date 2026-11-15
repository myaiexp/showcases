// zoom: scaling the view about its center
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "zoom: 1", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: #f06 }
          sphere { r: .3; fill: #fc0 }
          view: 20 40;
          zoom: 1;
        );
      ` },
    { label: "zoom: 1.5", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: #f06 }
          sphere { r: .3; fill: #fc0 }
          view: 20 40;
          zoom: 1.5;
        );
      ` },
    { label: "zoom: 2", code: `
        @grid: 1 / 100%;
        @content: @scene(
          torus { r: .5 .2; fill: #f06 }
          sphere { r: .3; fill: #fc0 }
          view: 20 40;
          zoom: 2;
        );
      ` },
  ],
  say: "zoom crops instead of moving the camera",
});

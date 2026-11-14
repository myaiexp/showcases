// Two hexagons spin; only the one with the attribute ignores reduced motion
import { simple } from '../../shared/a-kit.ts';

export default simple({
  doodles: [
    { label: "ignore-reduced-motion", attrs: {"ignore-reduced-motion":""}, code: `
      @grid: 1 / 100%;
      @place: center;
      @shape: hexagon;
      background: #e6437d;
      animation: spin 4s infinite linear;
      @keyframes spin {
        to { rotate: 1turn }
      }
    ` },
    { label: "default", code: `
      @grid: 1 / 100%;
      @place: center;
      @shape: hexagon;
      background: #fff;
      animation: spin 4s infinite linear;
      @keyframes spin {
        to { rotate: 1turn }
      }
    ` },
  ],
  say: "With no reduced-motion setting both turn",
});

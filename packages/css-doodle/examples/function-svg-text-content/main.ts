// content: text sets the text inside an element
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "plain", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 40 40;
        text { x: 20; y: 22; text-anchor: middle; font-size: 8; font-family: sans-serif; fill: #000; content: Hello }
      );
    ` },
      { label: "quoted", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 40 40;
        text { x: 20; y: 22; text-anchor: middle; font-size: 8; font-family: sans-serif; fill: #000; content: 'Hello, you' }
      );
    ` },
      { label: "with tspan", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 40 40;
        text { x: 20; y: 22; text-anchor: middle; font-size: 8; font-family: sans-serif; fill: #000; content: Hello <tspan fill="#e6437d">you</tspan> }
      );
    ` },
    ],
    say: "content: Hello <tspan>…</tspan>",
});

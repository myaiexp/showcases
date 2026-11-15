// @content puts real DOM inside each cell, from text to a nested doodle
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "text", code: `
      @grid: 1 / 100%;
      color: #fff;
      padding: 1rem;
      @content: "hello world";
    ` },
    { label: "@p([A-Z])", code: `
      @grid: 5 / 100% _1px;
      @content: @p([A-Z]);
      background: #e6437d;
      color: #fff;
      font-size: 1.5em;
    ` },
    { label: "@svg", code: `
      @grid: 1 / 100%;
      @content: @svg(
        viewBox: -5 -5 10 10;
        circle*15 {
          r: @nN(ease-out, *4.5);
          fill: none;
          stroke: #fff;
          stroke-width: .1;
        }
      );
    ` },
    { label: "@doodle", code: `
      @grid: 1 / 100%;
      @content: @doodle(
        @grid: 5 / 100%;
        background: #e6437d;
        clip-path: polygon(@m3.M2.r(100%));
      );
    ` },
    { label: "@raw", code: `
      @grid: 1 / 100%;
      color: #fff;
      align-self: center;
      @content: @raw(
        <style>h2, p { margin: 0 }</style>
        <h2>Hello World</h2>
        <p>This is a paragraph.</p>
      );
    ` },
  ],
});

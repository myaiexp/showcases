// @raw(...) keeps text as written for @content
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      align-self: center;
      color: #111;
      @content: @raw(
        <style>h2, p { margin: 0 }</style>
        <h2>Hello World</h2>
        <p>This is a paragraph.</p>
      );
    `,
    say: "@content: @raw(<h2>…</h2><p>…</p>)",
});

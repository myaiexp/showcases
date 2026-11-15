// A lone element is wrapped in an svg with xmlns
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "no xmlns", code: `
      @grid: 1 / 100%;
      background: @svg(
        <svg viewBox="0 0 10 10"><rect x="2" y="2" width="6" height="6" fill="#e6437d"/></svg>
      );
    ` },
      { label: "fragment", code: `
      @grid: 1 / 100%;
      background: @svg(
        <circle cx="75" cy="75" r="60" fill="#e6437d"/>
      ) 0 0 / auto 100% no-repeat;
    ` },
    ],
    say: "css-doodle adds what the XML leaves out",
});

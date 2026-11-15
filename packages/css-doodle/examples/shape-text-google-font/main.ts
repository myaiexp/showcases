// A Google font for text
import { show } from '../../shared/d-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        text: Ag;
        font: @google-font(Pacifico);
        scale: .9;
      );
    `,
    cardCode: `
      @grid: 1 / 100%;
      background: #000;
      clip-path: @shape(
        text: Ag;
        font: 900 cursive;
        scale: .9;
      );
    `,
    say: "Full view only: this loads Pacifico from Google Fonts",
});

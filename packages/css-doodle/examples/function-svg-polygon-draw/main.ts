// Names starting with draw or animate go to the shape
import { show } from '../../shared/c-kit.ts';

export default show({
    code: `
      @grid: 1 / 100%;
      background: @svg-polygon(
        star;
        stroke-width: .06;
        stroke: #e6437d;
        draw: 3s infinite;
      );
    `,
    say: "draw: 3s infinite on an @svg-polygon",
});

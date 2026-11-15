// | @svg-filter after @grid is a backdrop filter
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: ".015, 50", code: `
      @grid: 4 / 100% ^.85 _10px | @svg-filter(.015, 50);
      border-radius: 50%;
      background: #000;
    ` },
      { label: ".03, 30", code: `
      @grid: 4 / 100% ^.85 _10px | @svg-filter(.03, 30);
      border-radius: 50%;
      background: #000;
    ` },
      { label: ".005, 80", code: `
      @grid: 4 / 100% ^.85 _10px | @svg-filter(.005, 80);
      border-radius: 50%;
      background: #000;
    ` },
    ],
    say: "@grid: 4 / 100% ^.85 _10px | @svg-filter(.015, 50)",
});

// A custom property reads without -- and its unit
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "--step: 10%", code: `
      @grid: 1x10 / 100%;
      background: #000;
      --step: 10%;
      width: $%(step * @i);
    ` },
      { label: "--step: 5%", code: `
      @grid: 1x10 / 100%;
      background: #000;
      --step: 5%;
      width: $%(step * @i);
    ` },
      { label: "--step: 3px", code: `
      @grid: 1x10 / 100%;
      background: #000;
      --step: 3px;
      width: $px(step * @i);
    ` },
    ],
    say: "--step: 10% is step = 10 inside the expression",
});

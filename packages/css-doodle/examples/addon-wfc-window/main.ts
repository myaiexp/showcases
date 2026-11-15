// @wfc(): window size n and symmetry on a simple sample of squares
import '@css-doodle/addons/wfc';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: wfc;
    @grid: 32 / 100%;
    background: @wfc(
      sample:
        ..........
        .####.....
        .#..#.....
        .####..##.
        .......##.
        ..........;
      legend: . #f4efe6, # #1d3557;
    );
`;
const v1 = `
    @use: wfc;
    @grid: 32 / 100%;
    background: @wfc(
      sample:
        ..........
        .####.....
        .#..#.....
        .####..##.
        .......##.
        ..........;
      legend: . #f4efe6, # #1d3557;
      n: 2;
    );
`;
const v2 = `
    @use: wfc;
    @grid: 32 / 100%;
    background: @wfc(
      sample:
        ..........
        .####.....
        .#..#.....
        .####..##.
        .......##.
        ..........;
      legend: . #f4efe6, # #1d3557;
      symmetry: 1;
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0, { attrs: {"seed": "wfc"} });
  stage.variants(doodle, [
    { label: 'n: 3, symmetry: 8', code: v0 },
    { label: 'n: 2', code: v1 },
    { label: 'symmetry: 1', code: v2 },
  ]);
  stage.say('n: 2 copies less of the sample than the default 3');
  return () => stage.dispose();
};

export default mount;

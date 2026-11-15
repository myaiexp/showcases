// @wfc.tiles() lays rope tiles that match at their edges; @wfc.turn() turns them
import '@css-doodle/addons/wfc';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @use: wfc;
    @grid: 12 / 100%;
    :doodle { background: #1d3557 }
    --rope: #0000 35%, #f1c453 0 65%, #0000 0;
    --line: linear-gradient(90deg, var(--rope));
    --corner: radial-gradient(
      circle at 100% 0, #0000 24.7%, #f1c453 0 46%, #0000 0
    );
    --cross: linear-gradient(90deg,
      #0000 25%, #1d3557 0 35%, #f1c453 0 65%,
      #1d3557 0 75%, #0000 0
    ), linear-gradient(var(--rope));
    background: @wfc.tiles(
      var(--line) 1010, var(--corner) 1100, var(--cross) 1111
    );
    rotate: @wfc.turn();
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 2600);
  stage.say('Sides are top, right, bottom, left: 1010 is a straight rope');
  return () => stage.dispose();
};

export default mount;

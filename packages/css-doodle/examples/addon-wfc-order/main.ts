// @wfc.order() as an animation delay: the grid appears in the order it was solved
import '@css-doodle/addons/wfc';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @use: wfc;
    @grid: 16 / 100% / #f4efe6;
    --line: linear-gradient(90deg, #0000 40%, #222 0 60%, #0000 0);
    --corner: radial-gradient(circle at 100% 0, #0000 28.3%, #222 0 42.4%, #0000 0);
    background: @wfc.tiles(var(--line) 1010, var(--corner) 1100, none 0000);
    rotate: @wfc.turn();
    animation: appear .5s calc(@wfc.order() * 4s) both;
    @keyframes appear {
      from { opacity: 0; scale: .2 }
    }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle, 5200);
  stage.say('Delay = @wfc.order() × 4s: cells appear as they were decided');
  return () => stage.dispose();
};

export default mount;

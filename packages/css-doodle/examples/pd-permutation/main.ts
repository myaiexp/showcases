// A random permutation of positions
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 5 / 100% / #f5f5f0;
    @size: 19%;
    @content: @i;
    background: #000;
    color: #fff;
    @place: @pd.m5x5(
      @nx(*20%, -10%) @ny(*20%, -10%)
    );
    transition: .8s;
  `);
  stage.reroll(doodle);
  stage.say('Twenty-five cells, twenty-five places, none twice');
  return () => stage.dispose();
};

export default mount;

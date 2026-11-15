// @PN against @pn in nested doodles
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const outer = (pick: string): string => `
  @grid: 1 / 100%;
  background: @m2x2.doodle(
    @grid: 1 / 100%;
    background: #000;
    @shape: ${pick}(circle, triangle, hexagon, star);
  );
  background-repeat: no-repeat;
  background-size: 50% 50%;
  background-position: @m2x2(
    @nx(*100%, -100%) @ny(*100%, -100%)
  );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.doodle(outer('@pn'), { label: '@pn' });
  stage.doodle(outer('@PN'), { label: '@PN', editor: true });
  stage.say('@pn restarts in every nested doodle; @PN follows @m');
  return () => stage.dispose();
};

export default mount;

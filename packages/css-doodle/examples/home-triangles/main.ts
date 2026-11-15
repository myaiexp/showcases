// A 16 × 9 grid of half-square triangles in four colours, redrawn
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // Each cell picks a colour and one of four triangles (a polygon() clip-path).
  // transition: @r(1s) gives every cell its own duration, so a redraw ripples.
  const doodle = stage.doodle(
    `
    @grid: 16x9 / 100% auto _1px;
    transition: @r(1s) ease;
    background: @p(
      #ff8830, #d1b8a0, #aeced2, #cbdcdf
    );
    clip-path: polygon(@p(
      '0 0, 100% 0, 100% 100%',
      '0 0, 100% 0, 0 100%',
      '0 0, 100% 100%, 0 100%',
      '100% 0, 100% 100%, 0 100%'
    ));
  `,
    { frame: 'wide' },
  );
  stage.reroll(doodle, 2000);
  return () => stage.dispose();
};

export default mount;

// css-doodle example: let each cell know where it is, from the Start from a grid guide
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 7 / 100% / #333 _ 2px;
    background: #fff;
`;
const v1 = `
    @grid: 7 / 100% / #333 _ 2px;
    /* 7°, 14°, 21° … one hue per cell */
    background: hsl(@i(*7), 78%, 62%);
    @content: @i;
    color: #fff;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  // The card alternates with the step before, so the change shows.
  const show = stage.variants(doodle, [
    { label: 'before', code: v0 },
    { label: '@i(*7) hue', code: v1 },
  ]);
  // The full view opens on this step.
  if (!ctx.preview) show(1);
  stage.say('@i counts cells from 1, left to right, row by row.');
  return () => stage.dispose();
};

export default mount;

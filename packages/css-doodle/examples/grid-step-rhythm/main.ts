// Repeat a sequence of shapes, from the Start from a grid guide
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 7 / 100% / #333 _ 2px;
    background: hsl(@i(*7), 78%, 62%);
`;
const v1 = `
    @grid: 7 / 100% / #333 _ 2px;
    background: hsl(@i(*7), 78%, 62%);
    border-radius: @pn.cycle(100% 0 0 0);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  // The card alternates with the step before, so the change shows.
  const show = stage.variants(doodle, [
    { label: 'before', code: v0 },
    { label: '@pn.cycle', code: v1 },
  ]);
  // The full view opens on this step.
  if (!ctx.preview) show(1);
  stage.say('@cycle lists the four rotations; @pn deals them out in order.');
  return () => stage.dispose();
};

export default mount;

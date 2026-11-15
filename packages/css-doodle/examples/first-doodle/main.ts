// The getting-started doodle, a grid of leaves facing alternate ways
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// The guide's three lines, with the size changed from 60vmin to 100% of the frame.
const leaves = (n: number): string => `
  @grid: ${n} / 100% / #333;
  border-radius: @pn(100% 0, 0 100%);
  background: #fff;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(leaves(7));
  doodle.setAttribute('aria-label', 'A grid of white leaves on dark grey, neighbours facing opposite ways');

  // The same code on 5, 7 and 9 columns: @pn keeps alternating whatever the size.
  stage.variants(doodle, [5, 7, 9].map((n) => ({ label: `${n} × ${n}`, code: leaves(n) })));
  stage.say('@pn gives each cell the next value of the list, in order');
  return () => stage.dispose();
};

export default mount;

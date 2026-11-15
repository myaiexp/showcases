// target-arrowhead.shape picks the head drawn at the end of a connection.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'triangle, arrow, cross',
        code: `direction: right
a -> b: {target-arrowhead.shape: triangle}
c -> d: {target-arrowhead.shape: arrow}
e -> f: {target-arrowhead.shape: cross}
`,
      },
      {
        label: 'diamond, circle, box',
        code: `direction: right
a -> b: {target-arrowhead.shape: diamond}
c -> d: {target-arrowhead.shape: circle}
e -> f: {target-arrowhead.shape: box}
`,
      },
      {
        label: 'cf-one, cf-many',
        code: `direction: right
a -> b: {target-arrowhead.shape: cf-one}
c -> d: {target-arrowhead.shape: cf-one-required}
e -> f: {target-arrowhead.shape: cf-many}
g -> h: {target-arrowhead.shape: cf-many-required}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

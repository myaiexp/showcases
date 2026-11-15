// A `*` in a key matches any run of characters among the shapes at that level.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '*mini and *pro',
        code: `direction: right
iphone 10
iphone 11 mini
iphone 11 pro
iphone 12 mini

*.height: 300
*.width: 140
*mini.height: 200
*pro.height: 400
`,
      },
      {
        label: 'Case insensitive',
        code: `diddy kong
Donkey Kong

*kong.style.fill: brown
`,
      },
      {
        label: 't*h*r',
        code: `teacher
thriller
thrifter

t*h*r.shape: person
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

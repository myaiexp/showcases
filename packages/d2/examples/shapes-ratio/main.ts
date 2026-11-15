// circle and square stay as tall as they are wide.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Short label',
        code: `direction: right
c: ok {shape: circle}
s: ok {shape: square}
`,
      },
      {
        label: 'Long label grows both ways',
        code: `direction: right
c: a much longer label {shape: circle}
s: a much longer label {shape: square}
`,
      },
      {
        label: 'Explicit width and height',
        code: `direction: right
c: 140 {
  shape: circle
  width: 140
  height: 140
}
s: 70 {
  shape: square
  width: 70
  height: 70
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

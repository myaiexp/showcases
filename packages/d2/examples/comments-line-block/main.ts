// A `#` starts a line comment, on its own line or after code.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Line comment on its own line',
        code: `# Comments start with a hash character and continue until the next newline or EOF.
x -> y
`,
      },
      {
        label: 'Comment at the end of a line',
        code: `x -> y # I am at the end
`,
      },
      {
        label: 'Block comment',
        code: `x -> y
"""
This is a
block comment
"""
y -> z
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

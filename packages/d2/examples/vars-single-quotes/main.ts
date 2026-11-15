// A single-quoted string is literal: `'${names}'` stays text.
// A double-quoted or unquoted `${names}` is replaced.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Single vs double quotes',
        code: `direction: right
vars: {
  names: John and Joyce
}
a -> b: 'Send field \${names}'
a -> b: "Send \${names}"
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

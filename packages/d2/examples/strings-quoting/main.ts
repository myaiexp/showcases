// Most D2 text needs no quotes, and leading and trailing whitespace is trimmed.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Unquoted, whitespace trimmed',
        code: `   Office Bulb   :     Philips
            Switch   ->   Office Bulb
`,
      },
      {
        label: 'Quoted symbols',
        code: `'$$$' -> "###"
a -> b: "say \\"hi\\""
b -> '&&&'
`,
      },
      {
        label: 'Quotes and escapes',
        code: `a: "She said 'hi'"
b: 'He said "hi"'
c: "Both \\"kinds\\" and 'kinds'"
a -> b -> c
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

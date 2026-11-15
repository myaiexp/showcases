// `text-transform` sets label casing: `uppercase`, `lowercase`, `capitalize`.
// `none` cancels the upper-casing that a special theme applies.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'lowercase, uppercase, capitalize',
        code: `direction: right
TOM -> jerry: hi {
  style: {
    text-transform: capitalize
  }
}
TOM.style.text-transform: lowercase
jerry.style.text-transform: uppercase
`,
      },
      {
        label: 'capitalize on longer labels',
        code: `direction: right
the quick brown fox -> jumps over: {style.text-transform: capitalize}
the quick brown fox.style.text-transform: capitalize
`,
      },
      {
        label: 'none under the Terminal theme',
        code: `direction: right
upper by theme -> mixed case: hi
mixed case.style.text-transform: none
`,
        options: { themeID: 300 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

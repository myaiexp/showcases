// A grid inside a grid: a page layout of header, body and footer.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Page layout',
        code: `grid-gap: 0
grid-columns: 1
header
body: "" {
  grid-gap: 0
  grid-columns: 2
  content
  sidebar
}
footer
`,
      },
      {
        label: 'A sequence diagram as a cell',
        code: `grid-columns: 2
notes
chat: {
  shape: sequence_diagram
  a -> b: hi
  b -> a: hello
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

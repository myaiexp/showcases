// A `link` field makes a shape or connection clickable.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a shape or the connection label to open its link in a new tab.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Links on shapes and a connection',
        code: `x: I'm a Mac {
  link: https://apple.com
}
y: And I'm a PC {
  link: https://microsoft.com
}
x -> y: gazoontite {
  link: https://google.com
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

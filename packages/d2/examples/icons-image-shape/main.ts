// shape: image draws the icon alone, with no box around it.
import type { Mount } from '@/types.ts';
import { icons } from '../../shared/icons.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'shape: image',
        code: `direction: right
server: {
  shape: image
  icon: "${icons.server}"
}

database: {
  shape: image
  icon: "${icons.database}"
}

server -> database
`,
      },
      {
        label: 'Icon inside a box',
        code: `direction: right
server: {
  icon: "${icons.server}"
}

database: {
  icon: "${icons.database}"
}

server -> database
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

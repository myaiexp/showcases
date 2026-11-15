// `vars.d2-config` carries render options inside the file.
// Here: `theme-id`, `dark-theme-id`, `pad`, `center`, `sketch`, `layout-engine`.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compile options beat d2-config: this example passes none, so the config in the source is what you see. Edit it.' });
  playground(stage, {
    options: {},
    variants: [
      {
        label: 'All six keys',
        code: `vars: {
  d2-config: {
    theme-id: 4
    dark-theme-id: 200
    pad: 0
    center: true
    sketch: true
    layout-engine: elk
  }
}

direction: right
x -> y
`,
      },
      {
        label: 'Same file, one key changed',
        code: `vars: {
  d2-config: {
    theme-id: 8
    pad: 40
    sketch: false
    layout-engine: dagre
  }
}

direction: right
x -> y
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

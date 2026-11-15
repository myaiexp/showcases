// `&connected`, `&leaf` and `&link: *` filter shapes by their properties.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '&connected and &leaf',
        code: `**: {
  &connected: true
  style.fill: yellow
}

**: {
  &leaf: true
  style.stroke: red
}

container: {
  a -> b
}
c
`,
      },
      {
        label: '&link: *',
        code: `*: {
  &link: *
  style.fill: red
}

x.link: https://example.com
y
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

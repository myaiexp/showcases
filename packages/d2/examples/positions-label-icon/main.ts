// `near` under `label` and `icon` places them inside or `outside-` the shape
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
        label: 'label.near and icon.near',
        code: `direction: right
x -> y

x: worker {
  label.near: top-center
  icon: "${icons.user}"
  icon.near: outside-top-right
}

y: profits {
  label.near: bottom-right
  icon: "${icons.database}"
  icon.near: outside-top-left
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

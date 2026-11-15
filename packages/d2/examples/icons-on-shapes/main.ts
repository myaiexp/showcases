// The icon field takes a URL; here data: URLs stand in for hosted icons.
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
        label: 'Shapes and a connection',
        code: `direction: right
deploy: {
  icon: "${icons.gear}"
}

backup: {
  icon: "${icons.database}"
}

deploy -> backup: {
  icon: "${icons.cloud}"
}
`,
      },
      {
        label: 'Shape with label',
        code: `direction: right
api: API {
  icon: "${icons.server}"
}
user: Visitor {
  icon: "${icons.user}"
}
user -> api
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

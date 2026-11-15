// Substitutions look outward to the nearest enclosing `vars`, never inward.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Inner region shadows outer',
        code: `vars: {
  region: Global
}

lb: \${region} load balancer

zone1: {
  vars: {
    region: us-east-1
  }
  server: \${region} API
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

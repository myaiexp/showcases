// A connection between containers is not native to dagre: D2 adds a shim.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'dagre (shim)',
        code: `aws: {
  load balancer -> api
  api -> db
}
gcloud: {
  auth -> db
}
gcloud.auth -> aws.api
gcloud -> aws
`,
        options: { layout: "dagre" },
      },
      {
        label: 'elk',
        code: `aws: {
  load balancer -> api
  api -> db
}
gcloud: {
  auth -> db
}
gcloud.auth -> aws.api
gcloud -> aws
`,
        options: { layout: "elk" },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

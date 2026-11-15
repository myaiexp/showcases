// Braces group children so the container name is written once.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Nested',
        code: `clouds: {
  aws: {
    load_balancer -> api
    api -> db
  }
  gcloud: {
    auth -> db
  }

  gcloud -> aws
}
`,
      },
      {
        label: 'Same thing, dotted',
        code: `clouds.aws.load_balancer -> clouds.aws.api
clouds.aws.api -> clouds.aws.db
clouds.gcloud.auth -> clouds.gcloud.db
clouds.gcloud -> clouds.aws
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

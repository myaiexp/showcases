// Connecting a nested object on an actor draws a span on its lifeline.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Tour example',
        code: `shape: sequence_diagram
alice.t1 -> bob
alice.t2 -> bob.a
alice.t2.a -> bob.a
alice.t2.a <- bob.a
alice.t2 <- bob.a
`,
      },
      {
        label: 'One call',
        code: `shape: sequence_diagram
client.req -> server.handle: GET /
client.req <- server.handle: 200
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

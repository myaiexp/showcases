// shape: sequence_diagram draws connections as messages between actors.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Two actors',
        code: `shape: sequence_diagram
alice -> bob: What does it mean\\nto be well-adjusted?
bob -> alice: The ability to play bridge or\\ngolf as if they were games.
`,
      },
      {
        label: 'Three actors',
        code: `shape: sequence_diagram
client -> server: request
server -> db: query
db -> server: rows
server -> client: response
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

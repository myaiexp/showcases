// A container with inner connections, not connected itself, frames a group.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Two groups',
        code: `shape: sequence_diagram
# Predefine actors
alice
bob
shower thoughts: {
  alice -> bob: A physicist is an atom's way of knowing about atoms.
  alice -> bob: Today is the first day of the rest of your life.
}
life advice: {
  bob -> alice: If all else fails, lower your standards.
}
`,
      },
      {
        label: 'Nested group',
        code: `shape: sequence_diagram
client; server
login: {
  client -> server: credentials
  retry: {
    server -> client: denied
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

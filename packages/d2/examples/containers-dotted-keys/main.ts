// A dot in a key puts the shape inside another.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Dotted declarations',
        code: `server
# Declares a shape inside of another shape
server.process

# Can declare the container and child in same line
im a parent.im a child
`,
      },
      {
        label: 'Connection declares nested keys',
        code: `# Since connections can also declare keys, this works too
apartment.Bedroom.Bathroom -> office.Spare Room.Bathroom: Portal
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

// In a sequence diagram, alice and bob mean one actor each at any nesting.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Shared actors',
        code: `Office chatter: {
  shape: sequence_diagram
  alice: Alice
  bob: Bobby
  awkward small talk: {
    alice -> bob: uhm, hi
    bob -> alice: oh, hello
    icebreaker attempt: {
      alice -> bob: what did you have for lunch?
    }
    unfortunate outcome: {
      bob -> alice: that's personal
    }
  }
}
`,
      },
      {
        label: 'Ordinary containers',
        code: `direction: right
one: {
  alice -> bob
}
two: {
  alice -> bob
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

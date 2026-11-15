// A sequence diagram is a D2 object: contain it, label it, connect it.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Before and after',
        code: `direction: right
Before and after becoming friends: {
  2007: Office chatter in 2007 {
    shape: sequence_diagram
    alice: Alice
    bob: Bobby
    alice -> bob: uhm, hi
    bob -> alice: oh, hello
  }

  2012: Office chatter in 2012 {
    shape: sequence_diagram
    alice: Alice
    bob: Bobby
    alice -> bob: Want to play with ChatGPT?
    bob -> alice: Yes!
    bob -> alice.play: Write a play...
    alice.play -> bob.play: about 2 friends...
  }

  2007 -> 2012: Five\\nyears\\nlater
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;

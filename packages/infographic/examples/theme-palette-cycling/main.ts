// With 3 colours, the 4th item uses the 1st colour and the 5th item uses the 2nd
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: '3 items, 3 colours',
    syntax: `infographic list-grid-compact-card
theme dark
  palette #61DDAA #F6BD16 #F08BB4
data
  lists
    - label One
    - label Two
    - label Three`,
  },
  {
    say: '4 items, 3 colours',
    syntax: `infographic list-grid-compact-card
theme dark
  palette #61DDAA #F6BD16 #F08BB4
data
  lists
    - label One
    - label Two
    - label Three
    - label Four`,
  },
  {
    say: '5 items, 3 colours',
    syntax: `infographic list-grid-compact-card
theme dark
  palette #61DDAA #F6BD16 #F08BB4
data
  lists
    - label One
    - label Two
    - label Three
    - label Four
    - label Five`,
  },
  {
    say: '6 items, 3 colours',
    syntax: `infographic list-grid-compact-card
theme dark
  palette #61DDAA #F6BD16 #F08BB4
data
  lists
    - label One
    - label Two
    - label Three
    - label Four
    - label Five
    - label Six`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
    }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;

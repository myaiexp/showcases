// A ---->, -.-, ==> and id1(label) are read as the plain forms
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'A ----> B reads as A -> B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A ----> B`,
  },
  {
    say: 'A ==> B reads as A -> B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A ==> B`,
  },
  {
    say: 'A -.- B reads as A -- B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A -.- B`,
  },
  {
    say: 'B(Rounded label) reads as B[Rounded label]',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A --> B(Rounded label)`,
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

// With no nodes block, relations create the nodes and can label them with [text]
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'A - The Edge Between A and B -> B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A - The Edge Between A and B -> B`,
  },
  {
    say: 'B -> C[Label of C]: a node label in brackets',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A - The Edge Between A and B -> B
    B -> C[Label of C]`,
  },
  {
    say: 'C -->|The Edge Between C and D| D: a piped edge label',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  relations
    A - The Edge Between A and B -> B
    B -> C[Label of C]
    C -->|The Edge Between C and D| D`,
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

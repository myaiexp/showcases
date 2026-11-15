// YAML relations take direction, showArrow and arrowType as fields
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'direction both on A to B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
    - id B
    - id C
  relations
    - from A
      to B
      direction both
    - from B
      to C`,
  },
  {
    say: 'direction none on A to B: a plain line',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
    - id B
    - id C
  relations
    - from A
      to B
      direction none
    - from B
      to C`,
  },
  {
    say: 'showArrow false on A to B',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
    - id B
    - id C
  relations
    - from A
      to B
      showArrow false
    - from B
      to C`,
  },
  {
    say: 'arrowType diamond and arrow',
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  nodes
    - id A
    - id B
    - id C
  relations
    - from A
      to B
      arrowType diamond
    - from B
      to C
      arrowType arrow`,
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

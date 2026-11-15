// Steps through: Classification: the Relational structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Process: a data flow",
    syntax: `infographic relation-dagre-flow-tb-simple-circle-node
theme dark
data
  title Relational
  nodes
    - id Web
      label Web
      icon globe
    - id Api
      label API
      icon plug
    - id Auth
      label Auth
      icon lock
    - id Db
      label Data
      icon database
  relations
    Web -> Api
    Api -> Auth
    Api -> Db`,
  },
  {
    say: "Network: a hub and spokes",
    syntax: `infographic relation-network-icon-badge
theme dark
data
  title Relational
  nodes
    - id Web
      label Web
      icon globe
    - id Api
      label API
      icon plug
    - id Auth
      label Auth
      icon lock
    - id Db
      label Data
      icon database
  relations
    Web -> Api
    Api -> Auth
    Api -> Db`,
  },
  {
    say: "Conceptual: nodes on a ring",
    syntax: `infographic relation-circle-icon-badge
theme dark
data
  title Relational
  nodes
    - id Web
      label Web
      icon globe
    - id Api
      label API
      icon plug
    - id Auth
      label Auth
      icon lock
    - id Db
      label Data
      icon database
  relations
    Web -> Api
    Api -> Auth
    Auth -> Db
    Db -> Web`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 460, hint: "The cycle steps through the states; pause it to read the syntax on the right." });
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (step.padding !== undefined) infographic.update({ padding: ctx.preview ? Math.min(step.padding, 8) : step.padding });
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;

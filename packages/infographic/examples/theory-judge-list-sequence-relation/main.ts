// Steps through: Classification: connections decide the structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "No connectors, order can change: a List",
    syntax: `infographic list-grid-compact-card
theme dark
data
  title Same Four Labels
  lists
    - label 1 Speed
      desc Fast
      icon bolt
    - label 2 Safety
      desc Safe
      icon shield-halved
    - label 3 Size
      desc Small
      icon feather
    - label 4 Price
      desc Low
      icon tag`,
  },
  {
    say: "Arrows, order fixed: a Sequence",
    syntax: `infographic sequence-steps-simple
theme dark
data
  title Same Four Labels
  sequences
    - label 1 Design
      desc Draw
      icon pen-ruler
    - label 2 Build
      desc Make
      icon hammer
    - label 3 Test
      desc Check
      icon vial
    - label 4 Ship
      desc Go
      icon rocket`,
  },
  {
    say: "Links in many directions: a Relation",
    syntax: `infographic relation-network-icon-badge
theme dark
data
  title Same Four Labels
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
    Api -> Web
    Api -> Auth
    Api -> Db`,
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

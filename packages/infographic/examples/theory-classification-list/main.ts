// Steps through: Classification: the List structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "List: a card grid, order can change",
    syntax: `infographic list-grid-compact-card
theme dark
data
  title 5 Features
  lists
    - label Fast
      desc Loads quick
      icon bolt
    - label Safe
      desc Checks inputs
      icon shield-halved
    - label Light
      desc Few parts
      icon feather
    - label Open
      desc Source shared
      icon lock-open
    - label Free
      desc No fees
      icon gift`,
  },
  {
    say: "List: a checklist column",
    syntax: `infographic list-column-done-list
theme dark
data
  title 5 Features
  lists
    - label Fast
      desc Loads quick
      icon bolt
    - label Safe
      desc Checks inputs
      icon shield-halved
    - label Light
      desc Few parts
      icon feather
    - label Open
      desc Source shared
      icon lock-open
    - label Free
      desc No fees
      icon gift`,
  },
  {
    say: "List: a row of equal items",
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title 5 Features
  lists
    - label Fast
      desc Loads quick
      icon bolt
    - label Safe
      desc Checks inputs
      icon shield-halved
    - label Light
      desc Few parts
      icon feather
    - label Open
      desc Source shared
      icon lock-open`,
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

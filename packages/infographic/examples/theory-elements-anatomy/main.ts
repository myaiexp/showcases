// Steps through: Elements: the parts of an infographic
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Data items with labels only",
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label Plan

    - label Build

    - label Test

    - label Ship
`,
  },
  {
    say: "+ a title",
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Release Cycle
  lists
    - label Plan

    - label Build

    - label Test

    - label Ship
`,
  },
  {
    say: "+ an item description",
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Release Cycle
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Test
      desc Break it
    - label Ship
      desc Go live`,
  },
  {
    say: "+ an item icon",
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Release Cycle
  lists
    - label Plan
      desc Scope it
      icon clipboard-list
    - label Build
      desc Make it
      icon hammer
    - label Test
      desc Break it
      icon bug
    - label Ship
      desc Go live
      icon rocket`,
  },
  {
    say: "+ illustrations (illus)",
    syntax: `infographic list-row-simple-illus
theme dark
data
  title Release Cycle
  lists
    - label Plan
      desc Scope it
      illus clipboard-list
    - label Build
      desc Make it
      illus hammer
    - label Test
      desc Break it
      illus bug
    - label Ship
      desc Go live
      illus rocket`,
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

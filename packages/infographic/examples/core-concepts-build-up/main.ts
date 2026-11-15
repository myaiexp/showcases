// One infographic built up in the order the core concepts list: data, design, theme, resources
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Data under a template: infographic list-row-simple-horizontal-arrow',
    syntax: `infographic list-row-simple-horizontal-arrow
data
  title Weekly rhythm
  lists
    - label Plan
      desc Monday
    - label Build
      desc Tuesday to Thursday
    - label Review
      desc Friday`,
  },
  {
    say: 'Design: the template is replaced by a design block',
    syntax: `infographic
design
  structure list-row
    gap 0
    zigzag true
  item horizontal-icon-arrow
  title default
data
  title Weekly rhythm
  lists
    - label Plan
      desc Monday
    - label Build
      desc Tuesday to Thursday
    - label Review
      desc Friday`,
  },
  {
    say: 'Theme: dark with a palette',
    syntax: `infographic
design
  structure list-row
    gap 0
    zigzag true
  item horizontal-icon-arrow
  title default
theme dark
  palette #61DDAA #F6BD16 #F08BB4
data
  title Weekly rhythm
  lists
    - label Plan
      desc Monday
    - label Build
      desc Tuesday to Thursday
    - label Review
      desc Friday`,
  },
  {
    say: 'Resources: an icon on every item',
    syntax: `infographic
design
  structure list-row
    gap 0
    zigzag true
  item horizontal-icon-arrow
  title default
theme dark
  palette #61DDAA #F6BD16 #F08BB4
data
  title Weekly rhythm
  lists
    - label Plan
      desc Monday
      icon clipboard
    - label Build
      desc Tuesday to Thursday
      icon hammer
    - label Review
      desc Friday
      icon magnifying-glass`,
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

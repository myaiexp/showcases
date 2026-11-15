// stylize pattern with pattern line, dot, hex, diamond, mosaic or square fills the shapes
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'stylize pattern, pattern line',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern line
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'stylize pattern, pattern dot',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern dot
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'stylize pattern, pattern hex',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern hex
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'stylize pattern, pattern diamond',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern diamond
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'stylize pattern, pattern mosaic',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern mosaic
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'stylize pattern, pattern square',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern square
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
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

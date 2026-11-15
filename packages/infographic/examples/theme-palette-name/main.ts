// palette antv and palette spectral use the built-in palettes
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'No palette: every item uses the primary colour',
    syntax: `infographic chart-column-simple
theme dark
data
  values
    - label One
      value 12
    - label Two
      value 17
    - label Three
      value 9
    - label Four
      value 15
    - label Five
      value 11
    - label Six
      value 14`,
  },
  {
    say: 'palette antv',
    syntax: `infographic chart-column-simple
theme dark
  palette antv
data
  values
    - label One
      value 12
    - label Two
      value 17
    - label Three
      value 9
    - label Four
      value 15
    - label Five
      value 11
    - label Six
      value 14`,
  },
  {
    say: 'palette spectral',
    syntax: `infographic chart-column-simple
theme dark
  palette spectral
data
  values
    - label One
      value 12
    - label Two
      value 17
    - label Three
      value 9
    - label Four
      value 15
    - label Five
      value 11
    - label Six
      value 14`,
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

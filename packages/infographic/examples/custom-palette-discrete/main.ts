// registerPalette with a colour array, used by name
import { Infographic, registerPalette } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


registerPalette('showcase-sunset', ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C']);
registerPalette('showcase-sea', ['#74C0FC', '#4DABF7', '#339AF0']);

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'palette showcase-sunset (4 colours, 4 items)',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-sunset
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
    say: 'palette showcase-sea (3 colours, 4 items: wraps)',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-sea
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

  return () => {
    stage.dispose();
  };
};

export default mount;

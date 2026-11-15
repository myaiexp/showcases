// getPaletteColor(name, [i], n) read back into a side panel
import { Infographic, getPaletteColor, registerPalette } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


registerPalette('showcase-mint-ramp', (ratio) => 'hsl(160 ' + Math.round(30 + 60 * ratio) + '% ' + Math.round(75 - 35 * ratio) + '%)');
registerPalette('showcase-duo', ['#F472B6', '#60A5FA']);

/** What the library answers for each of `count` items. */
const sample = (name: string, count: number): string =>
  Array.from({ length: count }, (_, i) => 'getPaletteColor(' + JSON.stringify(name) + ', [' + i + '], ' + count + ') → ' + getPaletteColor(name, [i], count)).join('\n');

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'palette showcase-mint-ramp, 4 items',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-mint-ramp
data
  values
    - label A
      value 6
    - label B
      value 11
    - label C
      value 7
    - label D
      value 12`,
    name: 'showcase-mint-ramp',
    count: 4,
  },
  {
    say: 'palette showcase-duo, 4 items',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-duo
data
  values
    - label A
      value 6
    - label B
      value 11
    - label C
      value 7
    - label D
      value 12`,
    name: 'showcase-duo',
    count: 4,
  },
  {
    say: 'palette showcase-mint-ramp, 7 items',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-mint-ramp
data
  values
    - label A
      value 6
    - label B
      value 11
    - label C
      value 7
    - label D
      value 12
    - label E
      value 8
    - label F
      value 13
    - label G
      value 9`,
    name: 'showcase-mint-ramp',
    count: 7,
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
        if (code) code.textContent = sample(step.name, step.count) + '\n\n' + step.syntax;
      },
    })),
  );

  return () => {
    stage.dispose();
  };
};

export default mount;

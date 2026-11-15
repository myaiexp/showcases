// registerPalette with a function of ratio, index and count
import { Infographic, registerPalette } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


/** Blends two #rrggbb colours. Charts build gradient ids from the colour, so it must be a hex string. */
const mix = (a: string, b: string, t: number): string => {
  const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  return '#' + [0, 1, 2].map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t).toString(16).padStart(2, '0')).join('');
};

// ratio is index / count, from 0 up to just under 1; index and count are also passed.
registerPalette('showcase-heat', (ratio) => mix('#3B82F6', '#F43F5E', ratio));

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'palette showcase-heat, 3 columns',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-heat
data
  values
    - label A
      value 8
    - label B
      value 15
    - label C
      value 11`,
  },
  {
    say: 'palette showcase-heat, 6 columns',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-heat
data
  values
    - label A
      value 8
    - label B
      value 15
    - label C
      value 11
    - label D
      value 18
    - label E
      value 14
    - label F
      value 10`,
  },
  {
    say: 'palette showcase-heat, 9 columns',
    syntax: `infographic chart-column-simple
theme dark
  palette showcase-heat
data
  values
    - label A
      value 8
    - label B
      value 15
    - label C
      value 11
    - label D
      value 18
    - label E
      value 14
    - label F
      value 10
    - label G
      value 17
    - label H
      value 13
    - label I
      value 9`,
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

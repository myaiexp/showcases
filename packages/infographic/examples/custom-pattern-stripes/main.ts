// registerPattern with a stripes generator used by stylize pattern
import { Infographic, registerPattern } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


/** Builds an SVG element: patterns are DOM nodes, not strings. */
const svg = (tag: string, attrs: Record<string, string | number | null | undefined>): SVGElement => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) node.setAttribute(k, String(v));
  return node;
};

registerPattern('showcase-stripes', ({ scale = 1, backgroundColor, foregroundColor }) => {
  const pattern = svg('pattern', { width: 12, height: 12, patternUnits: 'userSpaceOnUse', patternTransform: 'scale(' + scale + ')' });
  pattern.append(svg('rect', { width: '100%', height: '100%', fill: backgroundColor }));
  pattern.append(svg('rect', { width: 12, height: 5, fill: foregroundColor }));
  return pattern as SVGPatternElement;
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'pattern showcase-stripes',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern showcase-stripes
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
    say: 'scale 2: wider stripes',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern showcase-stripes
    scale 2
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
    say: 'scale 0.6: finer stripes',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern showcase-stripes
    scale 0.6
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

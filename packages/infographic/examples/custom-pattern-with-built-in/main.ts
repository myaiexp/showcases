// A showcase-waves pattern chosen like any built-in pattern
import { Infographic, registerPattern } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


/** Builds an SVG element: patterns are DOM nodes, not strings. */
const svg = (tag: string, attrs: Record<string, string | number | null | undefined>): SVGElement => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) node.setAttribute(k, String(v));
  return node;
};

registerPattern('showcase-waves', ({ scale = 1, backgroundColor, foregroundColor }) => {
  const pattern = svg('pattern', { width: 20, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'scale(' + scale + ')' });
  pattern.append(svg('rect', { width: '100%', height: '100%', fill: backgroundColor }));
  pattern.append(
    svg('path', { d: 'M0 5 Q5 0 10 5 T20 5', fill: 'none', stroke: foregroundColor, 'stroke-width': 2 }),
  );
  return pattern as SVGPatternElement;
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'built-in: pattern line',
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
    say: 'registered: pattern showcase-waves',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern showcase-waves
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
    say: 'built-in: pattern dot',
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
    say: 'registered: showcase-waves, scale 1.8',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern showcase-waves
    scale 1.8
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

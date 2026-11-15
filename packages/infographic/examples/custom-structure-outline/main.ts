// A showcase-outline structure laying out nested children with indent
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Outline } from './outline.tsx';

registerStructure('showcase-outline', { component: Outline, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'one level of children',
    syntax: `infographic
design
  structure showcase-outline
    indent 36
  title default
  items
    - pill-badge
    - plain-text
    - plain-text
theme dark
data
  title Handbook
  root
    label Handbook
    children
      - label Intro
      - label Rules
      - label Tools`,
  },
  {
    say: 'children with children',
    syntax: `infographic
design
  structure showcase-outline
    indent 36
  title default
  items
    - pill-badge
    - plain-text
    - plain-text
theme dark
data
  title Handbook
  root
    label Handbook
    children
      - label Intro
      - label Rules
        children
          - label Safety
          - label Conduct
      - label Tools`,
  },
  {
    say: 'three levels deep',
    syntax: `infographic
design
  structure showcase-outline
    indent 36
  title default
  items
    - pill-badge
    - plain-text
    - plain-text
theme dark
data
  title Handbook
  root
    label Handbook
    children
      - label Intro
      - label Rules
        children
          - label Safety
            children
              - label Fire
              - label Water
          - label Conduct`,
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

// A showcase-fork tree structure using the Items array per level
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Fork } from './fork.tsx';

registerStructure('showcase-fork', { component: Fork, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'two children',
    syntax: `infographic
design
  structure showcase-fork
  title default
  items
    - pill-badge
    - simple
      width 110
theme dark
data
  title Org
  root
    label Studio
    children
      - label Design
      - label Code`,
  },
  {
    say: 'four children',
    syntax: `infographic
design
  structure showcase-fork
  title default
  items
    - pill-badge
    - simple
      width 110
theme dark
data
  title Org
  root
    label Studio
    children
      - label Design
      - label Code
      - label Sound
      - label Ops`,
  },
  {
    say: 'three children, levelGap 90',
    syntax: `infographic
design
  structure showcase-fork
    levelGap 90
  title default
  items
    - pill-badge
    - simple
      width 110
theme dark
data
  title Org
  root
    label Studio
    children
      - label Design
      - label Code
      - label Sound`,
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

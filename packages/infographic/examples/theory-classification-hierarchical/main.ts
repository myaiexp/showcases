// Steps through: Classification: the Hierarchical structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax. `padding` overrides the box padding for that step.
const STEPS: { say: string; syntax: string; padding?: number }[] = [
  {
    say: "Organisational: a company tree",
    syntax: `infographic hierarchy-tree-curved-line-rounded-rect-node
theme dark
data
  title Hierarchy
  root
    label Company
    children
      - label Product
        children
          - label Design
          - label Build
      - label Growth
        children
          - label Sales
          - label Content
      - label Support
        children
          - label People`,
  },
  {
    say: "Tree-like: a mind map",
    syntax: `infographic hierarchy-mindmap-branch-gradient-capsule-item
theme dark
data
  title Hierarchy
  root
    label Company
    children
      - label Product
        children
          - label Design
          - label Build
      - label Growth
        children
          - label Sales
          - label Content
      - label Support
        children
          - label People`,
  },
  {
    say: "Subordinate: containment in layers",
    syntax: `infographic hierarchy-structure
theme dark
data
  title Hierarchy
  items
    - label Executive
      children
        - label Product
          children
            - label Design
            - label Build
        - label Growth
          children
            - label Sales
            - label Content
    - label Support
      children
        - label People
          children
            - label Hiring
            - label Care
        - label Finance
          children
            - label Budget
            - label Audit`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 460, hint: "The cycle steps through the states; pause it to read the syntax on the right." });
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (step.padding !== undefined) infographic.update({ padding: ctx.preview ? Math.min(step.padding, 8) : step.padding });
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;

// registerTemplate with structure options and design.items
import { Infographic, registerTemplate } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


registerTemplate('showcase-org-tree', {
  design: {
    structure: { type: 'hierarchy-tree', orientation: 'left-right', edgeType: 'curved', levelGap: 50 },
    title: 'default',
    items: [{ type: 'rounded-rect-node' }, { type: 'plain-text' }],
  },
  theme: 'dark',
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'infographic showcase-org-tree',
    syntax: `infographic showcase-org-tree
data
  title Team
  root
    label Studio
    children
      - label Design
      - label Code`,
  },
  {
    say: 'more children',
    syntax: `infographic showcase-org-tree
data
  title Team
  root
    label Studio
    children
      - label Design
      - label Code
      - label Sound
      - label Ops`,
  },
  {
    say: 'two levels deep',
    syntax: `infographic showcase-org-tree
data
  title Team
  root
    label Studio
    children
      - label Design
        children
          - label UX
          - label Art
      - label Code
        children
          - label Web`,
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

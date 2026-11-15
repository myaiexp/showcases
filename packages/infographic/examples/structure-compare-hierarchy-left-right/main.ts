// CompareHierarchyLeftRight structure: cycles decoration, surround, flipLeaf, flipRoot and groupGap
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `compare-hierarchy-left-right` that the example steps through, one set per step.
const steps: Props[] = [
  { decoration: 'none' },
  { decoration: 'dot-line' },
  { decoration: 'arc-dot' },
  { decoration: 'split-line' },
  { decoration: 'dot-line', surround: false, flipLeaf: true },
  { decoration: 'split-line', flipRoot: true, groupGap: 30 },
];

// The data block: the data the structure takes.
const data = `
data
  title Plan A or Plan B
  desc Two options, three points each
  compares
    - label Plan A
      icon rocket
      children
        - label Quick
        - label Cheap
        - label Simple
    - label Plan B
      icon shield-halved
      children
        - label Robust
        - label Scalable
        - label Complex
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure compare-hierarchy-left-right` line of a design block.
const syntax = (props: Props): string => `
design
  structure compare-hierarchy-left-right
${lines(props)}
  items
    - circle-node
      width 140
    - pill-badge
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure compare-hierarchy-left-right. Pause it to read the syntax on the right, double-click a label to edit it.',
  });
  const panel = stage.side('Syntax');
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      editable: !ctx.preview,
      padding: ctx.preview ? 8 : 24,
    }),
  );

  stage.cycle(
    steps.map((props) => ({
      say: `structure compare-hierarchy-left-right: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
      run: () => {
        const text = syntax(props);
        if (panel) panel.textContent = text.trim();
        infographic.render(text);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;

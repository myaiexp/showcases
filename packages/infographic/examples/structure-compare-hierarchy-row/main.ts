// CompareHierarchyRow structure: cycles showColumnBackground, columnBackgroundAlpha, gap, itemGap and columnWidth
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `compare-hierarchy-row` that the example steps through, one set per step.
const steps: Props[] = [
  { showColumnBackground: false },
  { showColumnBackground: true, columnBackgroundAlpha: 0.08 },
  { showColumnBackground: true, columnBackgroundAlpha: 0.3 },
  { showColumnBackground: true, columnBackgroundAlpha: 0.15, gap: 30, itemGap: 8, columnWidth: 240 },
];

// The data block: the data the structure takes.
const data = `
data
  title Where We Stand
  compares
    - label Strengths
      children
        - label Loyal users
        - label Fast shipping
    - label Weaknesses
      children
        - label Small team
        - label Thin docs
    - label Threats
      children
        - label New rivals
        - label Price war
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure compare-hierarchy-row` line of a design block.
const syntax = (props: Props): string => `
design
  structure compare-hierarchy-row
${lines(props)}
  items
    - letter-card
    - rounded-rect-node
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure compare-hierarchy-row. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure compare-hierarchy-row: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

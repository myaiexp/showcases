// CompareBinaryHorizontal structure: cycles dividerType, flipped, groupGap, gap and opposite
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `compare-binary-horizontal` that the example steps through, one set per step.
const steps: Props[] = [
  { dividerType: 'vs' },
  { dividerType: 'pros-cons-fold' },
  { dividerType: 'pros-cons-arrow' },
  { dividerType: 'vs', flipped: true, groupGap: 60 },
  { dividerType: 'vs', gap: 6, opposite: false },
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
        - label Fast setup
        - label Low cost
        - label Easy to learn
    - label Plan B
      icon shield-halved
      children
        - label Deep control
        - label Big ecosystem
        - label Steep curve
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure compare-binary-horizontal` line of a design block.
const syntax = (props: Props): string => `
design
  structure compare-binary-horizontal
${lines(props)}
  item compact-card
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure compare-binary-horizontal. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure compare-binary-horizontal: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

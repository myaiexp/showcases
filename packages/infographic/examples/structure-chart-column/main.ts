// ChartColumn structure: cycles showValue, columnGap and columnWidth
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `chart-column` that the example steps through, one set per step.
const steps: Props[] = [
  { showValue: true, columnGap: 40 },
  { showValue: false, columnGap: 40 },
  { showValue: true, columnGap: 12, columnWidth: 70 },
  { showValue: true, columnGap: 80, columnWidth: 30 },
];

// The data block: the data the structure takes.
const data = `
data
  title Weekly Orders
  desc Signed values, bars rise and fall from a baseline
  values
    - label Visits
      value 1280
    - label Signups
      value 420
    - label Refunds
      value -90
    - label Orders
      value 310
    - label Returns
      value -35
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure chart-column` line of a design block.
const syntax = (props: Props): string => `
design
  structure chart-column
${lines(props)}
  item simple
    showIcon false
    usePaletteColor true
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure chart-column. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure chart-column: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

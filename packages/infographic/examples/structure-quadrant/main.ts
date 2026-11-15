// Quadrant structure: cycles showAxis, dashedAxis, quadrantWidth and quadrantHeight
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `quadrant` that the example steps through, one set per step.
const steps: Props[] = [
  { showAxis: true, dashedAxis: true },
  { showAxis: true, dashedAxis: false },
  { showAxis: false },
  { showAxis: true, dashedAxis: true, quadrantWidth: 260, quadrantHeight: 190 },
];

// The data block: the data the structure takes.
const data = `
data
  title Priority Matrix
  compares
    - label Do now
      desc Urgent and important
      icon bolt
    - label Plan
      desc Important, not urgent
      icon calendar
    - label Delegate
      desc Urgent, less important
      icon share-nodes
    - label Drop
      desc Neither
      icon trash
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure quadrant` line of a design block.
const syntax = (props: Props): string => `
design
  structure quadrant
${lines(props)}
  item quarter-simple-card
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure quadrant. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure quadrant: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

// LetterCard item: cycles showStripe, showGradient, showBottomShade, width and height
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `letter-card` that the example steps through, one set per step.
const steps: Props[] = [
  { showStripe: true, showGradient: true, showBottomShade: true },
  { showStripe: false, showGradient: true, showBottomShade: false },
  { showStripe: true, showGradient: false, showBottomShade: false },
  { showStripe: false, showGradient: false, showBottomShade: true },
  { width: 200, height: 100, showStripe: true, showGradient: true, showBottomShade: true },
];

// The data block: four short items with a title, description, value, icon and time.
const data = `
data
  title Launch Plan
  desc From first idea to first customers
  lists
    - label Alpha
      desc First in line
    - label Beta
      desc Second in line
    - label Gamma
      desc Third in line
    - label Delta
      desc Fourth in line
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `item letter-card` line of a design block.
const syntax = (props: Props): string => `
design
  structure list-grid
    columns 2
    gap 16
  item letter-card
${lines(props)}
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under item letter-card. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `item letter-card: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

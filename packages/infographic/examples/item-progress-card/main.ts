// ProgressCard item: cycles width, height, progressHeight, borderRadius, iconSize, gap and positionH
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `progress-card` that the example steps through, one set per step.
const steps: Props[] = [
  { width: 280, height: 120, progressHeight: 8 },
  { width: 280, height: 120, progressHeight: 20, borderRadius: 4 },
  { width: 340, height: 100, iconSize: 48, gap: 20, borderRadius: 30 },
  { width: 280, height: 120, positionH: 'flipped' },
];

// The data block: four short items with a title, description, value, icon and time.
const data = `
data
  title Launch Plan
  desc From first idea to first customers
  lists
    - label Discover
      desc Interview ten customers
      value 72
      icon magnifying-glass
      time Week 1
    - label Design
      desc Sketch the first flow
      value 55
      icon pen-ruler
      time Week 2
    - label Build
      desc Ship a working slice
      value 88
      icon code
      time Week 4
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `item progress-card` line of a design block.
const syntax = (props: Props): string => `
design
  structure list-column
    gap 12
  item progress-card
${lines(props)}
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under item progress-card. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `item progress-card: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

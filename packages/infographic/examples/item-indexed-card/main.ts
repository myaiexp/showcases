// IndexedCard item: cycles width, borderRadius, separatorHeight, padding, indexFontSize, labelFontSize and gap
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `indexed-card` that the example steps through, one set per step.
const steps: Props[] = [
  { width: 200, borderRadius: 12, separatorHeight: 2 },
  { width: 200, borderRadius: 0, separatorHeight: 6 },
  { width: 240, borderRadius: 30, padding: 24, indexFontSize: 30 },
  { width: 160, labelFontSize: 12, indexFontSize: 14, gap: 16 },
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
    - label Launch
      desc Open the doors
      value 34
      icon rocket
      time Week 6
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `item indexed-card` line of a design block.
const syntax = (props: Props): string => `
design
  structure list-grid
    columns 2
    gap 16
  item indexed-card
${lines(props)}
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under item indexed-card. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `item indexed-card: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

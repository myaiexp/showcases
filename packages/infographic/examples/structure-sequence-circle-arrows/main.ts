// SequenceCircleArrows structure: cycles radius, arrowSize and strokeWidth
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `sequence-circle-arrows` that the example steps through, one set per step.
const steps: Props[] = [
  { radius: 150, arrowSize: 4, strokeWidth: 10 },
  { radius: 150, arrowSize: 8, strokeWidth: 4 },
  { radius: 220, arrowSize: 4, strokeWidth: 18 },
  { radius: 110, arrowSize: 6, strokeWidth: 6 },
];

// The data block: the data the structure takes.
const data = `
data
  title Feedback Loop
  desc From first idea to first customers
  sequences
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

// Each step writes its props under the `structure sequence-circle-arrows` line of a design block.
const syntax = (props: Props): string => `
design
  structure sequence-circle-arrows
${lines(props)}
  item indexed-card
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure sequence-circle-arrows. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure sequence-circle-arrows: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

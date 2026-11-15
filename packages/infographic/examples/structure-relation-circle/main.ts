// RelationCircle structure: cycles radius and startMode
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `relation-circle` that the example steps through, one set per step.
const steps: Props[] = [
  { radius: 150, startMode: 'top' },
  { radius: 150, startMode: 'equal' },
  { radius: 90, startMode: 'top' },
  { radius: 220, startMode: 'equal' },
];

// The data block: the data the structure takes.
const data = `
data
  title Product Loop
  nodes
    - label Discover
      value 72
      icon magnifying-glass
    - label Design
      value 55
      icon pen-ruler
    - label Build
      value 88
      icon code
    - label Launch
      value 34
      icon rocket
    - label Learn
      value 61
      icon chart-line
    - label Grow
      value 47
      icon seedling
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure relation-circle` line of a design block.
const syntax = (props: Props): string => `
design
  structure relation-circle
${lines(props)}
  item icon-badge
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure relation-circle. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure relation-circle: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

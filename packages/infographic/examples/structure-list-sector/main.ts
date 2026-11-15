// ListSector structure: cycles outerRadius, innerRadius, gapAngle, startAngle and endAngle
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `list-sector` that the example steps through, one set per step.
const steps: Props[] = [
  { outerRadius: 250, innerRadius: 120, gapAngle: 1 },
  { outerRadius: 250, innerRadius: 120, gapAngle: 12 },
  { outerRadius: 250, innerRadius: 60, gapAngle: 4 },
  { outerRadius: 250, innerRadius: 120, startAngle: -180, endAngle: 0, gapAngle: 3 },
];

// The data block: the data the structure takes.
const data = `
data
  title Roadmap
  desc Four sectors
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

// Each step writes its props under the `structure list-sector` line of a design block.
const syntax = (props: Props): string => `
design
  structure list-sector
${lines(props)}
  item plain-text
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure list-sector. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure list-sector: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

// RelationNetwork structure: cycles spacing and showConnections
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `relation-network` that the example steps through, one set per step.
const steps: Props[] = [
  { spacing: 120, showConnections: true },
  { spacing: 120, showConnections: false },
  { spacing: 60, showConnections: true },
  { spacing: 200, showConnections: true },
];

// The data block: the data the structure takes.
const data = `
data
  title Core Platform
  nodes
    - id Core
      label Core
      value 99
      icon cube
    - id Auth
      label Auth
      value 72
      icon lock
    - id Data
      label Data
      value 64
      icon database
    - id Search
      label Search
      value 48
      icon magnifying-glass
    - id Mail
      label Mail
      value 35
      icon envelope
    - id Pay
      label Pay
      value 27
      icon credit-card
  relations
    Core -> Auth
    Core -> Data
    Core -> Search
    Core -> Mail
    Core -> Pay
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `structure relation-network` line of a design block.
const syntax = (props: Props): string => `
design
  structure relation-network
${lines(props)}
  item icon-badge
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under structure relation-network. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `structure relation-network: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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

// SimpleIllusItem item: cycles width, usePaletteColor, illusSize and gap
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

type Props = Record<string, string | number | boolean>;

// The documented props of `simple-illus` that the example steps through, one set per step.
const steps: Props[] = [
  { width: 180 },
  { width: 180, usePaletteColor: true },
  { width: 220, illusSize: 100 },
  { width: 140, gap: 20 },
];

// The data block: four short items with a title, description, value, icon and time.
const data = `
data
  title Launch Plan
  desc From first idea to first customers
  lists
    - label Plan
      desc Map the route
      illus lightbulb
    - label Build
      desc Make it real
      illus rocket
    - label Share
      desc Show the world
      illus users
`;

const lines = (props: Props): string =>
  Object.entries(props)
    .map(([key, value]) => `    ${key} ${value}`)
    .join('\n');

// Each step writes its props under the `item simple-illus` line of a design block.
const syntax = (props: Props): string => `
design
  structure list-row
    gap 16
  item simple-illus
${lines(props)}
theme dark
${data}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    height: 460,
    hint: 'The cycle changes the props under item simple-illus. Pause it to read the syntax on the right, double-click a label to edit it.',
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
      say: `item simple-illus: ${Object.entries(props).map(([k, v]) => `${k} ${v}`).join(', ')}`,
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
